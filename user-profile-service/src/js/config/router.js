import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from "@/components/MainComponent.vue";
import {getSession} from "@/js/service/session/session";
import { setCookies } from "@/js/utils/cookie";

const routes = [

    {path: '/', component: MainComponent}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
    const refreshToken = to.query.refreshToken;

    if (refreshToken) {
        try {
            const response = await getSession(refreshToken);

            setCookies({
                'accessToken': response.data.accessToken,
                'refreshToken': response.data.refreshToken
            });

            const queryWithoutToken = { ...to.query };
            delete queryWithoutToken.refreshToken;

            next({ ...to, query: queryWithoutToken });
        } catch (error) {
            console.error("Session creation error", error);
            next();
        }
    }
    next();
});

export default router;