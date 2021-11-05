<template>
	<ion-page>
		<ion-content>
			<ion-refresher @ionRefresh="refresh($event)" slot="fixed">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<div
				v-if="
					timeTable !== undefined &&
						timeTable.findByClassName(settings.className).length ===
							0
				"
			>
				<h2>
					Nothing to see here...
					{{ settings.className }}
				</h2>
			</div>
			<div
				v-if="
					timeTable !== undefined &&
						timeTable.findByClassName(settings.className).length > 0
				"
			>
				<div
					v-for="entry of timeTable.findByClassName(
						settings.className
					)"
					:key="entry"
				>
					<visual-entry :entry="entry"></visual-entry>
				</div>
			</div>
			<nav-bar />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
	IonPage,
	IonContent,
	IonRefresher,
	IonRefresherContent,
} from "@ionic/vue";
import NavBar from "@/components/NavBar.vue";
import store from "@/store";
import VisualEntry from "@/components/VisualEntry.vue";

export default defineComponent({
	store,
	components: {
		IonPage,
		IonContent,
		NavBar,
		VisualEntry,
		IonRefresher,
		IonRefresherContent,
	},
	data() {
		store.dispatch("update");
		const settings = store.getters.settings;
		return {
			settings,
			store,
			timeTable: store.state.timeTable,
		};
	},
	methods: {
		async refresh(event: any) {
			await store.dispatch("update");
			event.target.complete();
		},
	},
	watch: {
		"store.state.account.settings"(val) {
			this.settings = val;
		},
		"store.state.timeTable"(val) {
			this.timeTable = val;
		},
	},
});
</script>
