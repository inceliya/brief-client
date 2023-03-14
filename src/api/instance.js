import axios from "axios";
import { store } from "../store";
import { getAccessToken } from "../store/actionCreators";
import Endpoints from "./endpoints";

axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({ baseURL: 'https://briefipz193zms.azurewebsites.net/' });
//export const axiosInstance = axios.create({ baseURL: 'http://localhost:2999/' });

const urlsSkipAuth = [Endpoints.LOGIN, Endpoints.REFRESH, Endpoints.LOGOUT, Endpoints.FORM]

axiosInstance.interceptors.request.use(async (config) => {
    console.log(config.url);
    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config
    }

    const accessToken = await store.dispatch(getAccessToken())

    if (accessToken) {
        const autharization = `Bearer ${accessToken}`

        config.headers = {
            ...config.headers,
            authorization: autharization
        }
    }

    return config
})

/*axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoggedIn = !!store.getState().auth.authData.accessToken
  
        if ((error.response?.status === 401) && isLoggedIn && error.request.url !== Endpoints.AUTH.LOGOUT) {
            store.dispatch(logoutUser())
        }
  
        throw error
    }
  )*/