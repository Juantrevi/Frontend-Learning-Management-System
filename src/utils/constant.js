import UserData from "../views/plugin/UserData.js";

export const userId = UserData()?.user_id;
// export const teacherId = UserData()?.teacher_id;
export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const BASE_URL_EP = 'http://localhost:8000/api/v1/';
export const LOGIN_EP = 'user/token/';
export const REGISTER_EP = 'user/register/';
export const REFRESH_TOKEN_EP = 'user/token/refresh/';
export const RESET_PASSWORD_EP = 'user/password-reset/'
export const CREATE_NEW_PASSWORD_EP = 'create-new-password/'
export const PASSWORD_CHANGE_EP = 'user/password-change/'

export const UUIDB64_PARAMS = 'uuidb64'
export const REFRESH_TOKEN_PARAMS = 'refresh_token'
export const OTP_PARAMS = 'otp'

