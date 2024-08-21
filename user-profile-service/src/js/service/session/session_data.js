import UAParser from "ua-parser-js";
import { getIpData } from "@/js/utils/ip";

export async function createSessionData(userId, service, accessToken, refreshToken) {
    try {
        const parser = new UAParser();
        const deviceInfo = parser.getResult();
        const ipData = await getIpData();

        return {
            userId: userId,
            accessToken: accessToken,
            refreshToken: refreshToken,
            device: `${deviceInfo.browser.name} ${deviceInfo.browser.major}`,
            service: service,
            os: `${deviceInfo.os.name} ${deviceInfo.os.version}`,
            location: `${ipData.city}, ${ipData.country_name}`
        };
    } catch (error) {
        throw new Error(`Error creating session data: ${error}`);
    }
}