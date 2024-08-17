import UAParser from "ua-parser-js";
import { getCookies, getCookie } from "@/js/utils/cookie";
import { getIpData } from "@/js/utils/ip";

export async function createSessionData(userId) {
    try {
        const parser = new UAParser();
        const deviceInfo = parser.getResult();
        const jwtTokens = getCookies('accessToken', 'refreshToken');
        const serviceName = getCookie('serviceName');
        const ipData = await getIpData();

        if (!userId) {
            throw new Error('Missing user id');
        }
        if (!jwtTokens.accessToken || !jwtTokens.refreshToken) {
            throw new Error('Missing JWT tokens');
        }
        if (!ipData || !ipData.city || !ipData.country_name) {
            throw new Error('Missing IP data');
        }

        return {
            userId: userId,
            accessToken: jwtTokens.accessToken,
            refreshToken: jwtTokens.refreshToken,
            device: `${deviceInfo.browser.name} ${deviceInfo.browser.major}`,
            service: serviceName,
            os: `${deviceInfo.os.name} ${deviceInfo.os.version}`,
            location: `${ipData.city}, ${ipData.country_name}`
        };
    } catch (error) {
        console.error('Error creating session data:', error);
        return null;
    }
}