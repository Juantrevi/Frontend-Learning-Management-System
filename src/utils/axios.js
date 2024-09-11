import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

const apiInstance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance
