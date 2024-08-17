import axios from "@/axios";
import { setCookies } from "@/js/utils/cookie";
import { createSession } from "@/js/service/session/session";

export async function sendCode(code, providerName) {
    const response = await axios.post(`/api/auth/${providerName}/code`, null, {
        params: { code }
    });

    const accessToken = response.data.tokens.accessToken;
    const refreshToken = response.data.tokens.refreshToken;
    const userId = response.data.user.userId;

    setCookies({
        'accessToken': accessToken,
        'refreshToken': refreshToken
    });
    await createSession(userId)
    return response;
}