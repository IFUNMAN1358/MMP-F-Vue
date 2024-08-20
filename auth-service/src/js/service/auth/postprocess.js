import {getCookie, setCookies} from "@/js/utils/cookie";
import { createSession } from "@/js/service/session/session";
import { possibleRedirect } from "@/js/service/auth/redirect";

export async function postprocess(response) {
    const accessToken = response.data.tokens.accessToken;
    const refreshToken = response.data.tokens.refreshToken;
    const userId = response.data.user.userId;

    const service = getCookie('serviceName');

    if (service === 'AuthService') {
        setCookies({
            'accessToken': accessToken,
            'refreshToken': refreshToken
        });
    }
    await createSession(userId, service, accessToken, refreshToken)
    possibleRedirect(refreshToken)
}