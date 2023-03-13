import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authData: {
        accessToken: null,
        isLoading: null,
        error: null,
    },
    profileData: {
        profile: null,
        isLoading: null,
        error: null,
    }
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: true,
            }
        }),
        loginSucess: (state, action) => ({
            ...state,
            authData: {
                ...state.authData,
                accessToken: action.payload,
                isLoading: false,
                error: null,
            }
        }),
        loginFailure: (state, action) => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: false,
                error: action.payload,
            }
        }),
        loadProfileStart: (state) => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: true,
            }
        }),
        loadProfileSucess: (state, action) => ({
            ...state,
            profileData: {
                ...state.profileData,
                profile: action.payload,
                isLoading: false,
                error: null,
            }
        }),
        loadProfileFailure: (state, action) => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: false,
                error: action.payload,
            }
        }),
        logoutSuccess: () => initialState,
    },
})

export const { loginStart, loginSucess, loginFailure, loadProfileStart, loadProfileSucess, loadProfileFailure, logoutSuccess } = loginSlice.actions

export default loginSlice.reducer