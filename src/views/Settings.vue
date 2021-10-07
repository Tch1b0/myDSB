<template>
	<ion-page>
		<ion-content>
			<ion-button @click="logout">{{ text["logout"] }}</ion-button>
		</ion-content>
		<nav-bar />
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { IonPage, IonButton, IonContent } from "@ionic/vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
	store,
	components: { IonPage, IonButton, IonContent, NavBar },
	data() {
		store.dispatch("loadText", "settings").then((val) => {
			this.text = val;
		});
		return {
			text: {},
		};
	},
	methods: {
		logout() {
			store.dispatch("logout");
		},
	},
});
</script>
