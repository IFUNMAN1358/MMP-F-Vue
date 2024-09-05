export function openAuthPage() {

    const authPageUri = `${process.env.VUE_APP_AUTH_FRONT_URL}/auth`;

    const params = new URLSearchParams({
        redirectUri: window.location.href,
        serviceName: process.env.VUE_APP_SERVICE_NAME
    });

    window.location.href = `${authPageUri}?${params.toString()}`;
}