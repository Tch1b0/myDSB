<template>
	<ion-page>
		<ion-header></ion-header>
		<ion-title>myDSB</ion-title>
		<ion-content v-if="store.state.timeTable !== undefined">
			<div v-for="entry of store.state.timeTable.entries" :key="entry">
				<ion-text>{{ entry }}</ion-text>
				<br />
			</div>
		</ion-content>
		<ion-footer>
			<ion-toolbar>
				<ion-progress-bar
					v-show="store.state.loadingState === 'loading'"
					type="indeterminate"
				></ion-progress-bar>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script lang="ts">
import store from "@/store";
import { Dsbmobile, TimeTable } from "dsbmobile";
import { defineComponent } from "vue";
import { IonPage, IonContent, IonText, IonTitle, IonHeader } from "@ionic/vue";

interface Data {
	dsb: Dsbmobile;
	dsbInfo?: TimeTable;
	debugText: string;
}

export default defineComponent<Data>({
	store: store,
	components: { IonPage, IonContent, IonText, IonTitle, IonHeader },
	data() {
		store.dispatch("update");
		return {
			// dsb: store.state.dsb,
			store,
		};
	},
	beforeRouteEnter(_from, _to, next) {
		if (store.state.dsb === undefined) {
			next("login");
		} else {
			next();
		}
	},
});
</script>

<style scoped>
ion-title {
	color: white;
}
</style>
