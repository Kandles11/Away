import { AuthTokens, BaseHttpRequest, CancelablePromise, OpenAPI, OpenAPIConfig, Token, User } from './generated/client/';
import { request as __request } from './generated/client/core/request'
import { APIClient } from './generated/client/APIClient';
import { create } from 'zustand'
import { useMutation, useQuery } from '@tanstack/react-query'
import { router } from 'expo-router';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { ApiRequestOptions } from './generated/client/core/ApiRequestOptions';

export class AxiosHttpRequestWithRetry extends BaseHttpRequest {
    axiosInstance = axios.create();
  
    constructor(config: OpenAPIConfig) {
      super(config);
      // TODO: add axios intercepter, clear tokens on a 401?
      // TODO: figure out token refresh
      // TODO: figure out how to handle token expiration
      this.axiosInstance.interceptors.request.use(async (config) => {
        const token = await getToken()
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    })
}
    public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
      return __request(this.config, options, this.axiosInstance);
    }
  }

const api = new APIClient({}, AxiosHttpRequestWithRetry)
OpenAPI.TOKEN = () => getToken();

console.log({api})

type State = {
    accessToken?: Token
    refreshToken?: Token
    user?: User
    lastUpdated?: Date
    _hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
}

export const useAppStore = create<State>()(persist(
    (set) => ({
        accessToken: undefined,
        refreshToken: undefined,
        user: undefined,
        lastUpdated: undefined,
        _hasHydrated: false,
        setHasHydrated: (state: boolean) => {
            set({
                _hasHydrated: state
            });
        }
    }), {
    storage: createJSONStorage(() => AsyncStorage),
    name: 'away-state-storage',
    version: 1,
    onRehydrateStorage: () => (state?: State) => {

        if (!state || state._hasHydrated) return
        state.setHasHydrated(true)
    }
}))

const getToken = async () => {
    console.log("Getting token")
    const value = useAppStore.getState().accessToken?.token || ''
    console.log("getToken", { value })
    return Promise.resolve(value)
};

export const clearToken = () => {
    console.log("clearToken")
    useAppStore.setState({ accessToken: undefined, refreshToken: undefined, user: undefined, lastUpdated: undefined })
}

export const hasValidToken = () => {
    console.log("hasValidToken")
    const state = useAppStore.getState()
    const token = state.accessToken
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

export const useUserQuery = (user='me')=>{
    
    return useQuery({
    queryKey: ['user', user] as const,
    queryFn: async({queryKey})=>{
        const id = queryKey[1]
        console.log('use user',{id})
        const res = await api.users.getUsers1({id})
        return res
    },
  })}

  export const getUserBaggage = (user='me')=>{
    
    return useQuery({
    queryKey: ['userBaggage', user] as const,
    queryFn: async({queryKey})=>{
        const id = queryKey[1]
        console.log('use user',{id})
        const res = await api.baggage.getBaggageUser({user : id})
        return res
    },
  })}






