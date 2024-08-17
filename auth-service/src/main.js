import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router.js';
import VueCookies from 'vue-cookies';
import { sessionSubscribe } from "@/js/service/session/ws_session";

const app = createApp(App);

app.use(router)
app.use(VueCookies)
app.mount('#app')

sessionSubscribe();