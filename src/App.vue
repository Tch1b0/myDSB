<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import store from "@/store";
import { Account } from "./utility/account";
import { Storage } from "@ionic/storage";
import router from "@/router";

export default defineComponent({
	name: "App",
	setup() {
		const storage = new Storage();
		storage.create().then(async () => {
			store.commit("storage", storage);
			const accountInfo = await store.state.storage.get("account");

			console.info("Account-set Value: ", accountInfo);

			if (accountInfo !== null) {
				const acc = Account.fromJSON(JSON.parse(accountInfo));
				store.commit("account", acc);
				store.dispatch("login", { goHome: true });
				router.push("home");
			}
		});
	},
	store,
	components: {
		IonApp,
		IonRouterOutlet,
	},
});
</script>
