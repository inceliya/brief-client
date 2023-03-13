import axios from "axios";
import Endpoints from "./endpoints";
import { axiosInstance } from "./instance";

export const login = params => axiosInstance.post(Endpoints.LOGIN, params);

export const logout = () => axiosInstance.post(Endpoints.LOGOUT);

export const refresh = () => axiosInstance.get(Endpoints.REFRESH);

export const results = () => axiosInstance.get(Endpoints.RESULTS);

export const addToFavourite = params => axiosInstance.post(Endpoints.ADDTOFAVOURITE, params);

export const deleteAnswer = params => axiosInstance.post(Endpoints.DELETEANSWER, params);