<template>
	<ion-page>
		<ion-content>
			<div
				v-if="
					store.state.timeTable !== undefined &&
						store.state.timeTable.entries.length > 0
				"
			>
				<div
					v-for="entry of store.state.timeTable.entries"
					:key="entry"
				>
					<visual-entry :entry="entry"></visual-entry>
				</div>
			</div>
		</ion-content>
		<nav-bar />
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import NavBar from "@/components/NavBar.vue";
import store from "@/store";
import VisualEntry from "@/components/VisualEntry.vue";

export default defineComponent({
	store,
	components: { IonPage, IonContent, NavBar, VisualEntry },
	data() {
		store.dispatch("update");
		return {
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
