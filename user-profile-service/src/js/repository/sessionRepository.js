import axios from "@/js/config/axios";
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

export async function getSession(serviceName, refreshToken) {
    return await axios.get('/api/session', {
        params: {
            "serviceName": serviceName
        },
        headers: {
            'Refresh-Token': refreshToken
        }
    });
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