<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import store from "@/store";
import { Storage } from "@capacitor/storage";
import { Account } from "./utility/account";

export default defineComponent({
	name: "App",
	setup() {
		Storage.get({ key: "account" }).then((val) => {
			alert(val.value);
			if (val.value !== null && val.value !== "undefined") {
				const acc = Account.fromJSON(JSON.parse(val.value));

				store.commit("account", acc);
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
