// import {useAuthStore} from "../store/auth.js";
// import axios from "./axios";
// import jwt_decode from "jwt-decode"
// import Cookie from "js-cookie"
// import Swal from "sweetalert2"
//
// export const login = async (email, password) => {
//     try {
//         const {data, status} = await axios.post('user/token/', {email, password});
//
//         if (status === 200){
//
//             const { setUser } = useAuthStore.getState();
//             setUser({ access: data.access, refresh: data.refresh });
//             //Deprecated
//             //setAuthUser(data.access, data.refresh);
//             alert("Login Successfully")
//         }
//
//         return { data, error: null };
//     } catch (error){
//         console.log(error)
//         return {
//             data: null,
//             error: error.response.data.detail || "Something went wrong with the login"
//         }
//
//     }
// };
//
// export const register = async (full_name, email, password, password2) => {
//     try {
//         const {data} = await axios.post('user/register/', {full_name, email, password, password2})
//         await login(email, password)
//         alert("Registration successfully")
//         return {data, error: null}
//     } catch (error){
//         console.log(error)
//         return {
//             data: null,
//             error: error.response.data.detail || "Something went wrong with the registration"
//         }
//     }
// };
//
// export const logout = () => {
//     Cookie.remove("access_token")
//     Cookie.remove("refresh_token")
//     useAuthStore.getState().setUser(null)
//
//     alert("Logout successfully")
// };
//
// export const setUser = async () => {
//     const access_token = Cookie.get('access_token')
//     const refresh_token = Cookie.get('refresh_token')
//
//     if(!access_token || !refresh_token){
//         alert("Token does not exists")
//         return;
//     }
//
//     if(isAccessTokenExpired(access_token)){
//         const response = getRefreshedToken(refresh_token)
//         setAuthUser(response.access, response.refresh)
//     }else{
//         setAuthUser(access_token, refresh_token)
//     }
//
// };
//
// export const setAuthUser = (access_token, refresh_token) => {
//     Cookie.set('access_token', access_token, {
//         expires: 1,
//         secure: true
//     })
//
//     Cookie.set('refresh_token', refresh_token, {
//         expires: 7,
//         secure: true
//     });
//
//     const user = jwt_decode(access_token) ?? null
//
//     if(user){
//         useAuthStore.getState().setUser(user)
//     }else {
//         setAuthUser.getState().setLoading(false)
//     }
//
// };
//
// export const getRefreshedToken = async () => {
//     const refresh_token = Cookie.get('refresh_token');
//     const response = await axios.post('token/refresh/', {refresh: refresh_token});
//
//     return response.data
// };
//
// export const isAccessTokenExpired = (access_token) => {
//     try {
//         const decodedToken = jwt_decode(access_token);
//         return decodedToken.exp < Date.now() / 1000
//     }catch (error){
//         console.log(error)
//         return true
//     }
// }

import { useAuthStore } from "../store/auth.js";
import axios from "./axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import Swal from "sweetalert2";
import * as constants from './constant.js';
import { handleApiError } from "./handleApiError.js";

// Function to log in a user
export const login = async (email, password) => {
    try {
        // Send a POST request to the login API with email and password
        const { data, status } = await axios.post(constants.API_LOGIN, { email, password });

        // If login is successful, set the user authentication tokens and show a success message
        if (status === 200) {
            setAuthUser(data.access, data.refresh);
            //Swal.fire("Login Successfully", "", "success");
        }

        return { data, error: null };
    } catch (error) {
        // Handle any errors that occur during login
        console.log(error);
        return handleApiError(error, "Something went wrong with the login");
    }
};

// Function to register a new user
export const register = async (full_name, email, password, password2) => {
    try {
        // Send a POST request to the registration API with user details
        const { data } = await axios.post(constants.API_REGISTER, { full_name, email, password, password2 });

        // Automatically log in the user after successful registration
        await login(email, password);
        //Swal.fire("Registration successfully", "", "success");
        return { data, error: null };
    } catch (error) {

        // Handle any errors that occur during registration
        return handleApiError(error.response.data.email, "Something went wrong with the registration");
    }
};

// Function to log out a user
export const logout = () => {
    // Remove authentication tokens from cookies
    Cookie.remove(constants.ACCESS_TOKEN);
    Cookie.remove(constants.REFRESH_TOKEN);

    // Clear the user state in the auth store
    useAuthStore.getState().setUser(null);
    Swal.fire("Logout successfully", "", "success");
};

// Function to set the user based on stored tokens
export const setUser = async () => {
    const access_token = Cookie.get(constants.ACCESS_TOKEN);
    const refresh_token = Cookie.get(constants.REFRESH_TOKEN);

    // If tokens are missing, show an error message
    if (!access_token || !refresh_token) {
        // Swal.fire("There has been an error with the token", "", "error");
        return;
    }

    // If the access token is expired, refresh it
    if (isAccessTokenExpired(access_token)) {
        const response = await getRefreshedToken(refresh_token);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(access_token, refresh_token);
    }
};

// Function to set authentication tokens and user information
export const setAuthUser = (access_token, refresh_token) => {
    // Store tokens in cookies
    Cookie.set(constants.ACCESS_TOKEN, access_token, { expires: 1, secure: true });
    Cookie.set(constants.REFRESH_TOKEN, refresh_token, { expires: 7, secure: true });

    // Decode the access token to get user information
    const user = jwt_decode(access_token) ?? null;

    // Set the user in the auth store
    if (user) {
        useAuthStore.getState().setUser(user);
    } else {
        useAuthStore.getState().setLoading(false);
    }
};

// Function to get a new access token using the refresh token
export const getRefreshedToken = async () => {
    const refresh_token = Cookie.get(constants.REFRESH_TOKEN);
    const response = await axios.post(constants.API_REFRESH, { refresh: refresh_token });
    return response.data;
};

// Function to check if the access token is expired
export const isAccessTokenExpired = (access_token) => {
    try {
        const decodedToken = jwt_decode(access_token);
        return decodedToken.exp < Date.now() / 1000;
    } catch (error) {
        console.log(error);
        return true;
    }
};