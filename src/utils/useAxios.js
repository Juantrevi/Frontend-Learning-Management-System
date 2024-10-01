import axios from "axios";
import { getRefreshedToken, isAccessTokenExpired, setAuthUser } from "./auth.js";
import * as constants from './constant.js';
import Cookie from "js-cookie";

const useAxios = () => {
    const accessToken = Cookie.get(constants.ACCESS_TOKEN);
    const refreshToken = Cookie.get(constants.REFRESH_TOKEN);
    const csrfToken = Cookie.get('csrftoken'); // Get CSRF token from cookies

    const axiosInstance = axios.create({
        baseURL: constants.BASE_URL_EP,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfToken // Include CSRF token in headers
        },
        withCredentials: true
    });

    axiosInstance.interceptors.request.use(async (req) => {
        let token = accessToken;

        if (!token) {
            // console.error("Access token is missing");
            throw new Error("Access token is missing");
        }

        if (isAccessTokenExpired(token)) {
            try {
                // console.log('Access token expired, refreshing token...');
                const response = await getRefreshedToken(refreshToken);
                token = response.access;
                setAuthUser(response.access, response.refresh);
                req.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                // console.error('Error refreshing token:', error);
                throw error;
            }
        } else {
            // console.log('Access token is valid');
        }

        req.headers.Authorization = `Bearer ${token}`;
        return req;
    }, (error) => {
        // console.error('Error in request interceptor:', error);
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            // console.error('Error in response interceptor:', error);
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxios;