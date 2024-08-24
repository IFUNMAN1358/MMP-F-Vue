import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from "@/components/MainComponent.vue";
import AuthComponent from "@/components/auth/AuthComponent.vue";
import RedirectHandler from "@/components/auth/RedirectHandler.vue";
import LogoutComponent from "@/components/auth/LogoutComponent.vue";
import TestComponent from "@/components/TestComponent.vue";

const routes = [

    {path: '/', component: MainComponent},

    {path: '/test', component: TestComponent},

    {path: '/auth', component: AuthComponent},
    {path: '/oauth/:provider/redirect', component: RedirectHandler},
    {path: '/logout', component: LogoutComponent}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;