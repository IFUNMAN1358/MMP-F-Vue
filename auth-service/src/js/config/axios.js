import axios from 'axios';
import { updateSession } from "@/js/service/session/session";
import { getCookies, removeCookies, setCookies} from "@/js/utils/cookie";

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
                const c = getCookies('accessToken', 'refreshToken');
                const service = process.env.VUE_APP_SERVICE_NAME;

                if (c.accessToken && c.refreshToken) {
                    const response = await updateSession(null, service, c.accessToken, c.refreshToken);

                    setCookies({
                        'accessToken': response.data.accessToken,
                        'refreshToken': response.data.refreshToken
                    });

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