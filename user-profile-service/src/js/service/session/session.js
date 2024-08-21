import axios from "@/js/config/axios";
import { createSessionData } from "@/js/service/session/session_data";

export async function getSession(refreshToken) {
    return await axios.get('/api/session', {
        params: {
            refreshToken: refreshToken
        }
    });
}

export async function updateSession(userId, service, accessToken, refreshToken) {
    try {
        const sessionData = await createSessionData(userId, service, accessToken, refreshToken);
        return await axios.post("/api/session/update", sessionData);
    } catch (error) {
        throw new Error(`Failed to update session: ${error}`);
    }
}