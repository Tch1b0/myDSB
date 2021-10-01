<template>
	<ion-page>
		<ion-header></ion-header>
		<ion-title>myDSB</ion-title>
		<ion-content>
			<br />
			<ion-text
				>Info:
				{{
					dsbInfo === undefined
						? "undefined"
						: dsbInfo.entries[0].oldSubject
				}}</ion-text
			>
			<br />
			<ion-text>{{ debugText }}</ion-text>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import store from "@/store";
import { Dsbmobile, TimeTable } from "dsbmobile";
import { defineComponent } from "vue";
import { IonPage, IonContent, IonText, IonTitle, IonHeader } from "@ionic/vue";

interface Data {
	dsb: Dsbmobile;
	dsbInfo: TimeTable;
	debugText: string;
}

export default defineComponent<Data>({
	store: store,
	components: { IonPage, IonContent, IonText, IonTitle, IonHeader },
	data() {
		store.dispatch("login", {}).then(() => store.dispatch("update"));

		return {
			// dsb: store.state.dsb,
			dsb: store.state.dsb,
			dsbInfo: store.state.timeTable,
			debugText: store.state.loadingState,
		};
	},
	methods: {},
	watch: {},
});
</script>

<style scoped>
ion-title {
	color: white;
}
</style>
