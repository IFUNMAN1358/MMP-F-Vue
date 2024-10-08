import { createApp } from 'vue';
import App from './App.vue';
import router from '@/js/config/router';
import VueCookies from 'vue-cookies';
import {sessionSubscribe} from "@/js/ws/sessionWs";

const app = createApp(App);

app.use(router)
app.use(VueCookies)
app.mount('#app')

sessionSubscribe();