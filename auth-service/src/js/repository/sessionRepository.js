import axios from "@/js/config/axios";
import { getCookie } from "@/js/utils/cookie";
import UAParser from "ua-parser-js";

export async function createSessionData(serviceName, accessToken, refreshToken) {
    try {
        const ua = new UAParser().getResult();

        const ipDataResponse = await axios.get(`https://ipapi.co/json`, { withCredentials: false });
        const ipData = ipDataResponse.data;

        return {
            serviceName: serviceName,
            accessToken: accessToken,
            refreshToken: refreshToken,
            deviceName: `${ua.browser.name} ${ua.browser.major}`,
            deviceOs: `${ua.os.name} ${ua.os.version}`,
            location: `${ipData.city}, ${ipData.country_name}`
        };
    } catch (error) {
        throw new Error(`Error creating session data: ${error}`);
    }
}

export async function getSessions() {
    const accessToken = getCookie('accessToken');
    return await axios.get('/api/sessions', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}

export async function createSession(sessionData) {
    try {
        return await axios.post('/api/session', sessionData, {
            headers: {
                'Authorization': `Bearer ${sessionData.accessToken}`
            }
        });
    } catch (error) {
        throw new Error(`Failed to create session: ${error}`);
    }
}

export async function updateSession(sessionData) {
    try {
        return await axios.post("/api/session/update", sessionData, {
            headers: {
                'Refresh-Token': sessionData.refreshToken
            }
        });
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