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
        path: "/news",
        component: () => import("@/views/News.vue"),
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

// execute before every route call
router.beforeEach((to, _from, next) => {
    // check wether the user is logged in and if so,
    // let them enter the route
    if (store.state.dsb !== undefined) {
        next();
    }

    // else if the user has his credentials stored locally,
    // log in from there
    else if (
        store.state.account.username !== undefined ||
        store.state.account.token !== undefined
    ) {
        store
            .dispatch("login")
            .then(() => {
                next();
            })
            .catch(() => {
                next("login");
            });
    }

    // else if the user doesn't want to access the login route,
    // send them there
    else if (to.path !== "/login") {
        next("login");
    }

    // if the user wants to access the login route,
    // let them
    else {
        next();
    }
});

export default router;
