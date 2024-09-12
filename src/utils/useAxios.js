import axios from "axios";
import {getRefreshedToken, isAccessTokenExpired, setAuthUser} from "./auth.js";
import * as constants from './constant.js';
import Cookie from "js-cookie";

const useAxios = () => {
    const accessToken = Cookie.get(constants.ACCESS_TOKEN);
    const refreshToken = Cookie.get(constants.REFRESH_TOKEN);

    const axiosInstance = axios.create({
        baseURL: constants.API_BASE_URL,
        headers: { Authorization: `bearer ${accessToken}` }
    });

    axiosInstance.interceptors.request.use(async (req) => {
        if(!isAccessTokenExpired){
            return req;
        } else {
            const response = await getRefreshedToken(refreshToken);
            setAuthUser(response.access, response.refresh);
            req.headers.Authorization = `Bearer ${response.data?.access}`;
            return req;
        }
    });
    return axiosInstance;
};

export default useAxios;