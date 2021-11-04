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

/**
 * This is the Main component, which is always on the top.
 * It is mounted on the HTML element with the `app` id
 */
export default defineComponent({
	name: "App",
	// Because this is the Main component, the setup is called directly
	// when the app is loaded
	setup() {
		const storage = new Storage();

		// Create the storage
		storage.create().then(async () => {
			// Commit the storage to the store, so the
			// Storage is globally available
			store.commit("storage", storage);

			// Try to get the accountInfo from the storage
			const accountInfo = await store.state.storage.get("account");

			// Print the value of the account if it is set
			// TODO: Remove when Account-handeling is finished
			console.info("Account-set Value: ", accountInfo);

			// if the accountInfo was able to be read from the storage
			if (accountInfo !== null) {
				// Create a new account from the JSON
				const acc = Account.fromJSON(JSON.parse(accountInfo));

				// Commit the account to the store
				store.commit("account", acc);

				// Tell the store to login and go Home if logged in successfull
				// * Skipping the login page
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
