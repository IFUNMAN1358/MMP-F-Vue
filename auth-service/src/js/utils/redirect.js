export function possibleRedirect(redirectUri, refreshToken) {
    if (redirectUri) {
        const params = new URLSearchParams({
            refreshToken: refreshToken
        });
        window.location.href = `${redirectUri}?${params.toString()}`;
    }
}

export function handleRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
}

export function loginWithGoogle() {
    const googleClientId = process.env.VUE_APP_OAUTH_GOOGLE_CLIENT_ID;
    const googleRedirectUri = process.env.VUE_APP_OAUTH_GOOGLE_REDIRECT_URI;
    const googleScope = process.env.VUE_APP_OAUTH_GOOGLE_SCOPE;

    window.location.href =
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&scope=${googleScope}`;
}

export function loginWithFacebook() {
    const facebookClientId = process.env.VUE_APP_OAUTH_FACEBOOK_CLIENT_ID;
    const facebookRedirectUri = process.env.VUE_APP_OAUTH_FACEBOOK_REDIRECT_URI;
    const facebookScope = process.env.VUE_APP_OAUTH_FACEBOOK_SCOPE;

    window.location.href =
        `https://www.facebook.com/v20.0/dialog/oauth?client_id=${facebookClientId}&redirect_uri=${facebookRedirectUri}&scope=${facebookScope}&response_type=code`;
}

export function loginWithYandex() {
    const yandexClientId = process.env.VUE_APP_OAUTH_YANDEX_CLIENT_ID;
    const yandexRedirectUri = process.env.VUE_APP_OAUTH_YANDEX_REDIRECT_URI;

    window.location.href =
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${yandexClientId}&redirect_uri=${yandexRedirectUri}`;
}