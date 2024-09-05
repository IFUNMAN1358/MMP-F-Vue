import {getCookie, setCookies} from "@/js/utils/cookie";
import {login, sendCode} from "@/js/repository/authRepository";
import {createSession, createSessionData} from "@/js/repository/sessionRepository";
import {possibleRedirect} from "@/js/utils/redirect";

export async function handleLogin(loginForm) {
    try {
        const redirectUri = getCookie('redirectUri')
        const serviceName = getCookie('serviceName');

        const loginResponse = await login(serviceName, loginForm);

        if (serviceName === 'AuthService') {
            setCookies({
                'accessToken': loginResponse.data.tokens.accessToken,
                'refreshToken': loginResponse.data.tokens.refreshToken
            });
        }

        const sessionData = await createSessionData(serviceName, loginResponse.data.tokens.accessToken, loginResponse.data.tokens.refreshToken);
        await createSession(sessionData);

        possibleRedirect(redirectUri, loginResponse.data.tokens.refreshToken);
    } catch (error) {
        console.error('Login failed:', error);
    }
}

export async function handleOauth(code, providerName) {
    try {
        const redirectUri = getCookie('redirectUri')
        const serviceName = getCookie('serviceName');

        const oauthResponse = await sendCode(code, providerName);

        if (serviceName === 'AuthService') {
            setCookies({
                'accessToken': oauthResponse.data.tokens.accessToken,
                'refreshToken': oauthResponse.data.tokens.refreshToken
            });
        }

        const sessionData = await createSessionData(serviceName, oauthResponse.data.tokens.accessToken, oauthResponse.data.tokens.refreshToken);
        await createSession(sessionData);

        possibleRedirect(redirectUri, oauthResponse.data.tokens.refreshToken);
    } catch (error) {
        console.error('Login failed:', error);
    }
}