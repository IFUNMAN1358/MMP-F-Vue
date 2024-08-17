export function openAuthPage() {

    const authPageUri = `${process.env.VUE_APP_AUTH_SERVICE_FRONT_URL}/auth`;

    const params = new URLSearchParams({
        serviceName: process.env.VUE_APP_SERVICE_NAME,
        redirectUri: window.location.href
    });

    window.location.href = `${authPageUri}?${params.toString()}`;
}





