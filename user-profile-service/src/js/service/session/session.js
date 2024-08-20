import axios from "@/js/config/axios";
import {setCookies} from "@/js/utils/cookie";

export async function getSession(refreshToken) {
    return await axios.get('/api/session', {
        params: {
            refreshToken: refreshToken
        }
    });
}

export async function updateSession(refreshToken) {
    const response = await axios.post("/api/session/update", {
        refreshToken: refreshToken
    });
    setCookies({
        'accessToken': response.data.accessToken,
        'refreshToken': response.data.refreshToken
    });
    return response;
}