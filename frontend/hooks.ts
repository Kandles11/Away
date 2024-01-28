import { AuthTokens, OpenAPI, Token, User } from './generated/client/';
import { APIClient } from './generated/client/APIClient';
import { create } from 'zustand'
import { useMutation, useQuery } from '@tanstack/react-query'

const api = new APIClient()

// TODO: figure out zustand store persistence
// TODO: use react query for all data fetching
const initialState = {
    accessToken: undefined as Token | undefined,
    refreshToken: undefined as Token | undefined,
    user: undefined as User | undefined,
    tokens: undefined as AuthTokens | undefined,
    lastUpdated: undefined as Date | undefined,
}

console.log({api})

type State = typeof initialState

export const useAppStore = create<State>((set) => (initialState))

const getToken = async () => {
    console.log("getToken")
    const vallue = useAppStore.getState().accessToken?.token || ''
    console.log(vallue)
    return Promise.resolve(vallue)
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
    if (!valid) clearToken()
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

        // TODO: router.push to the home page
        // Also TODO: require auth to be on the home page
        // index should redirect to login route if there is no token
        // index should redirect to the home page if there is a token
}

export const useLoginMutation = ()=> useMutation({
    mutationFn: api.auth.postAuthLogin,
    onSuccess: (res) => {
        onAuthComplete(res.tokens, res.user)
    }
  })

export const useRegisterMutation = ()=>useMutation({
    mutationFn: api.auth.postAuthRegister,
    onSuccess: (res) => {
        console.log({res})
        onAuthComplete(res.tokens, res.user)
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

