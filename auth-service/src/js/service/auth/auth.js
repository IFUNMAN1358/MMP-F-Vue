import axios from "@/js/config/axios";
import { postprocess } from "@/js/service/auth/postprocess";


export async function login(loginForm) {
    const response = await axios.post('/api/auth/login', loginForm);
    await postprocess(response);
    return response;
}

export async function sendCode(code, providerName) {
    const response = await axios.post(`/api/auth/${providerName}/code`, null, {
        params: { code }
    });
    await postprocess(response);
    return response;
}