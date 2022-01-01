import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/settings",
        component: () => import("@/views/Settings.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (store.state.dsb !== undefined) {
        next();
    } else if (store.state.account.username !== undefined) {
        store.dispatch("login").then(() => {
            next("home");
        });
    } else if (to.path !== "/login") {
        next("login");
    } else {
        next();
    }
});

export default router;
