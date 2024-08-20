import axios from 'axios';
import {getCookie, removeCookies} from "@/js/utils/cookie";
import {updateSession} from "@/js/service/session/session";

axios.defaults.baseURL = process.env.VUE_APP_BACK_BASE_URL

axios.interceptors.response.use(
    async response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getCookie('refreshToken');
                if (refreshToken) {
                    const response = await updateSession(refreshToken);

                    originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                    return axios(originalRequest);
                }
            } catch (error) {
                await removeCookies('accessToken', 'refreshToken');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axios;