import { AuthTokens, OpenAPI, Token, User } from './generated/client/';
import { APIClient } from './generated/client/APIClient';
import { create } from 'zustand'
import { useMutation, useQuery } from '@tanstack/react-query'
import { router } from 'expo-router';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = new APIClient()

// TODO: add axios intercepter, clear tokens on a 401?
const initialState = {
    accessToken: undefined as Token | undefined,
    refreshToken: undefined as Token | undefined,
    user: undefined as User | undefined,
    tokens: undefined as AuthTokens | undefined,
    lastUpdated: undefined as Date | undefined,
}

console.log({api})

type State = typeof initialState

export const useAppStore = create<State>()(persist(
    () => initialState, {
    storage: createJSONStorage(() => AsyncStorage),
    name: 'away-state-storage',
    version: 1,
}))

const getToken = async () => {
    const value = useAppStore.getState().accessToken?.token || ''
    console.log("getToken", { value })
    return Promise.resolve(value)
};

const clearToken = () => {
    console.log("clearToken")
    useAppStore.setState({ accessToken: undefined, refreshToken: undefined, user: undefined, lastUpdated: undefined })
}

export const hasValidToken = () => {
    console.log("hasValidToken")
    const token = useAppStore.getState().accessToken
    if (!token || !token.expires) {
        return false
    }

    const valid = new Date(token.expires) > new Date()
    if (!valid) {
        console.log("Clearing expired token")
        clearToken()
        console.log("Cleared expired token")
    }
    return valid
}

// TODO: figure out token refresh
// TODO: figure out how to handle token expiration

const onAuthComplete = (tokens?: AuthTokens, user?: User) => {
    console.log("onAuthComplete",{ tokens, user })
    // TODO: proper error handling lol
    if (!tokens) {
        throw new Error('No tokens returned from login')
    }
    useAppStore.setState({ accessToken: tokens.access, refreshToken: tokens.refresh, user, lastUpdated: new Date() })
    router.push('/')
}

export const useLoginMutation = ()=> useMutation({
    mutationFn: (...args: Parameters<typeof api.auth.postAuthLogin>)=> {
        console.log({args})
        return api.auth.postAuthLogin(...args)
    },
    onSuccess: (res) => {
        onAuthComplete(res.tokens, res.user)
    }
  })


export const useRegisterMutation = ()=>useMutation({
    // TODO: refactor into a common wrapper function
    mutationFn: (...args: Parameters<typeof api.auth.postAuthRegister>)=> {
        console.log({args})
        return api.auth.postAuthRegister(...args)
    },
    onSuccess: (res) => {
        console.log({res})
        onAuthComplete(res.tokens, res.user)
    },
    onError(error, variables, context) {
        console.log({error, variables, context})
    },
  })

  export const useUserQuery = (user='me')=>useQuery({
    queryKey: ['user', user] as const,
    queryFn: async(user)=>{
        const res = await api.users.getUsers1({id:user.queryKey[1]})
        return res
    },
    initialData: useAppStore.getState().user,
    initialDataUpdatedAt: useAppStore.getState().lastUpdated?.getTime()
  })



OpenAPI.TOKEN = getToken;

