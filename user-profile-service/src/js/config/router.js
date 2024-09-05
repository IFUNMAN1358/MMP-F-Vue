import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from "@/components/MainComponent.vue";
import { setCookies } from "@/js/utils/cookie";
import {getSession} from "@/js/repository/sessionRepository";

const routes = [

    {path: '/', component: MainComponent}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
    const refreshToken = to.query.refreshToken;
    const serviceName = process.env.VUE_APP_SERVICE_NAME;

    if (refreshToken && serviceName) {
        try {
            const response = await getSession(serviceName, refreshToken);

            setCookies({
                'accessToken': response.data.accessToken,
                'refreshToken': response.data.refreshToken
            });

            const queryWithoutToken = { ...to.query };
            delete queryWithoutToken.refreshToken;

            next({ path: to.path, query: queryWithoutToken });
        } catch (error) {
            next();
        }
    } else {
        next();
    }
});

export default router;