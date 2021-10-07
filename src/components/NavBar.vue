<template>
	<ion-tabs>
		<ion-tab-bar>
			<ion-tab-button tab="home" @click="redir('home')">
				<ion-icon :icon="planet"></ion-icon>
			</ion-tab-button>
			<ion-tab-button tab="settings" @click="redir('settings')">
				<ion-icon :icon="settings"></ion-icon>
			</ion-tab-button>
		</ion-tab-bar>
	</ion-tabs>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonTabBar, IonTabButton, IonIcon, IonTabs } from "@ionic/vue";
import { planet, settings } from "ionicons/icons";

export default defineComponent({
	components: { IonTabBar, IonTabButton, IonIcon, IonTabs },
	data() {
		return { planet, settings };
	},
	methods: {
		redir(route: string) {
			this.$router.push(route);
		},
	},
});
</script>
