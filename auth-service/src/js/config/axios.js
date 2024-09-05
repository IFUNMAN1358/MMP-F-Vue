import axios from 'axios';
import {createSessionData, updateSession} from "@/js/repository/sessionRepository";
import {getCookies, removeCookies, setCookies} from "@/js/utils/cookie";

axios.defaults.baseURL = process.env.VUE_APP_BACK_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

let isRefreshing = false;

axios.interceptors.response.use(
    async response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const c = getCookies('accessToken', 'refreshToken');
                    const serviceName = process.env.VUE_APP_SERVICE_NAME;

                    if (c.accessToken && c.refreshToken) {
                        const sessionData = await createSessionData(serviceName, c.accessToken, c.refreshToken);
                        const response = await updateSession(sessionData);

                        setCookies({
                            'accessToken': response.data.accessToken,
                            'refreshToken': response.data.refreshToken
                        });

                        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                        isRefreshing = false;
                        return axios(originalRequest);
                    }
                } catch (error) {
                    await removeCookies('accessToken', 'refreshToken');
                    isRefreshing = false;
                    return Promise.reject(error);
                }
            } else {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axios;