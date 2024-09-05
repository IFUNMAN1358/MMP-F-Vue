import axios from "@/js/config/axios";


export async function login(serviceName, loginForm) {
    try {
        return await axios.post('/api/auth/login', loginForm);
    } catch (error) {
        throw new Error(`Failed to login: ${error}`);
    }
}

export async function sendCode(code, providerName) {
    try {
        return await axios.post(`/api/auth/${providerName}/code`, null, {
            params: { code }
        });
    } catch (error) {
        throw new Error(`Failed to oauth: ${error}`);
    }
}