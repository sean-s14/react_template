import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
import { useAuth, useAuthUpdate } from 'contexts/exports';

const NODE_ENV = process.env.NODE_ENV;
const REACT_APP_SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;
const baseURL = NODE_ENV === 'development'
    ? REACT_APP_SERVER_ADDRESS
    : NODE_ENV === 'production'
        ? REACT_APP_SERVER_ADDRESS
        : null


const useAxios = () => {

    const auth = useAuth();
    const authUpdate = useAuthUpdate();

    const instance = axios.create({
        baseURL,
        withCredentials: true,
        headers:{
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${auth?.accessToken}`
        }
    });

    instance.interceptors.request.use(async req => {
        console.log('Interceptor Request :', req);

        if (req.url === '/auth/login/') {
            return req;
        }

        if (req.headers.hasOwnProperty("Authorization")) {
            return req;
        }

        // Gets new Refresh & Access tokens using current Refresh token
        const refreshTokens = () => {
            return axios.post(
                `${baseURL}/auth/refresh/`,
                {},
                { 
                    withCredentials: true, 
                    headers: {'Content-Type': 'application/json'}
                }
            )
        }
        
        // Check if user has tokens
        if (auth?.accessToken) {
            // Check if users access token has expired
            const user = jwt_decode(auth.accessToken)
            console.log('User (decoded token) :', user);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if(!isExpired) {
                if (!req.headers.hasOwnProperty("Authorization")) {
                    req.headers.Authorization = `Bearer ${auth?.accessToken}`
                }
                return req;
            }
        }

        try {
            const response = await refreshTokens();
            // Set tokens here then update auth context in response interceptor, so as to not disrupt request
            req.headers.Authorization = `Bearer ${response?.data?.accessToken}`
            return req;
        } catch (err) {
            console.log(err);
            if (err?.response?.status === 401) {
                authUpdate('clear');
            }
            return req;
        }

    })

    instance.interceptors.response.use( async res => {
        console.log('Interceptor Response :', res);
        // console.log('Interceptor Response Data :', res?.data);
        return res;
    }, err => {
        console.log('Interceptor Error :', err);
        console.log('Interceptor Error Response :', err?.response);
        // console.log('Interceptor Error Response Data :', err?.response?.data);
        throw err;
    });
    
    return instance
}

export default useAxios;