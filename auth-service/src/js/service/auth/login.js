import axios from "@/axios";
import { setCookies } from "@/js/utils/cookie";
import { createSession } from "@/js/service/session/session";

export async function login(loginForm) {
    const response = await axios.post('/api/auth/login', loginForm);

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