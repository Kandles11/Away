import { AuthTokens, OpenAPI, User } from '../generated/client/';
import { APIClient } from '../generated/client/APIClient';
import { create } from 'zustand'

const c = new APIClient()

// TODO: figure out zustand store persistence
// TODO: use react query for all data fetching
const initialState = {
    authToken: undefined as string | undefined,
    user: undefined as User | undefined,
    tokens: undefined as AuthTokens | undefined,
}

type State = typeof initialState

export const useAppStore = create<State>((set) => (initialState))

const getToken = async () => {
    return Promise.resolve(useAppStore.getState().authToken || '')
};

OpenAPI.TOKEN = getToken;

