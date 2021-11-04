import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import store from "./store";

// Create the Main Vue component and tell it to use ionic, the store and the router
const app = createApp(App)
	.use(store)
	.use(IonicVue)
	.use(router);

// Mount the Main Vue component to the element in the
// HTML that has the `app` tag when the router is ready
router.isReady().then(() => {
	app.mount("#app");
});
