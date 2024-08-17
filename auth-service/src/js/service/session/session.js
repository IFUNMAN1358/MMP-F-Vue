import axios from '@/axios';
import { getCookie, setCookies } from "@/js/utils/cookie";
import { createSessionData } from '@/js/service/session/session_data'

export async function getSessions() {
    const accessToken = getCookie('accessToken');
    return await axios.get('/api/session', {
        params: {
            service: `${process.env.VUE_APP_SERVICE_NAME}`
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}

export async function createSession(userId) {

    const sessionData = await createSessionData(userId);

    try {
        const response = await axios.post('/api/session', sessionData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create session');
    }
}

export async function updateSession() {
    const refreshToken = getCookie('refreshToken');

    if (refreshToken) {
        const response = await axios.post("/api/session/update", {
            refreshToken: refreshToken
        });
        const tokens = response.data;
        if (tokens.accessToken && tokens.refreshToken) {
            setCookies({
                'accessToken': tokens.accessToken,
                'refreshToken': tokens.refreshToken
            });
        } else {
            throw new Error("Invalid tokens received from the server");
        }
    }
}

export async function deleteSession(sessionId) {
    const accessToken = getCookie('accessToken');
    await axios.post("/api/session/delete", {
        sessionId: sessionId
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}