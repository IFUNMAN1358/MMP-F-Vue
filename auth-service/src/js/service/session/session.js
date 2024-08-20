import axios from "@/js/config/axios";
import { getCookie, setCookies } from "@/js/utils/cookie";
import { createSessionData } from '@/js/service/session/session_data'

export async function getSessions() {
    const accessToken = getCookie('accessToken');
    return await axios.get('/api/sessions', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}

export async function createSession(userId, service, accessToken, refreshToken) {

    const sessionData = await createSessionData(userId, service, accessToken, refreshToken);

    try {
        const response = await axios.post('/api/session', sessionData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create session');
    }
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