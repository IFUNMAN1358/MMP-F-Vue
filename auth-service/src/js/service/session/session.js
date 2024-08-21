import axios from "@/js/config/axios";
import { getCookie } from "@/js/utils/cookie";
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
    try {
        const sessionData = await createSessionData(userId, service, accessToken, refreshToken);
        return await axios.post('/api/session', sessionData);
    } catch (error) {
        throw new Error(`Failed to create session: ${error}`);
    }
}

export async function updateSession(userId, service, accessToken, refreshToken) {
    try {
        const sessionData = await createSessionData(userId, service, accessToken, refreshToken);
        return await axios.post("/api/session/update", sessionData);
    } catch (error) {
        throw new Error(`Failed to update session: ${error}`);
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