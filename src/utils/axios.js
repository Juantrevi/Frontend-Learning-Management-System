import axios from 'axios'
import {BASE_URL_EP} from "./constant.js";


const apiInstance = axios.create({
    baseURL: BASE_URL_EP,
    timeout: 10000,
    headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance
