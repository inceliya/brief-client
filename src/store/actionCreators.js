import { store } from "."
import { login, refresh } from "../api"
import { isTokenExpired } from "../utils/jwt"
import { loginFailure, loginStart, loginSucess } from "./loginReducer"

export const loginUser =
    (data) =>
        async (dispatch) => {
            try {
                dispatch(loginStart())
                const res = await login(data)
                dispatch(loginSucess(res.data.token))
                // dispatch(getProfile())
            } catch (e) {
                console.error(e)
                dispatch(loginFailure(e.message))
            }
        }

/*export const logoutUser =
    () =>
        async (dispatch) => {
            try {
                await api.auth.logout()

                dispatch(logoutSuccess())

                history.push('/')
            } catch (e) {
                console.error(e)
            }
        }*/


/*export const getProfile = () =>
    async (dispatch) => {
        try {
            dispatch(loadProfileStart())

            const res = await api.auth.getProfile()

            dispatch(loadProfileSucess(res.data))
        } catch (e) {
            console.error(e)

            dispatch(loadProfileFailure(e.message))
        }
    }*/

let refreshTokenRequest = null;

export const getAccessToken =
    () =>
        async (dispatch) => {
            try {
                const accessToken = store.getState().login.authData.accessToken;

                if (!accessToken || isTokenExpired(accessToken)) {
                    if (refreshTokenRequest === null) {
                        refreshTokenRequest = refresh();
                    }

                    const res = await refreshTokenRequest;
                    refreshTokenRequest = null;

                    dispatch(loginSucess(res.data.token));

                    return res.data.token;
                }

                return accessToken
            } catch (e) {
                console.error(e);

                return null
            }
        }