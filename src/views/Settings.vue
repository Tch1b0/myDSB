<template>
	<ion-page>
		<ion-content>
			<ion-grid>
				<ion-row justify-content-center center>
					<ion-col>
						<ion-card>
							<ion-item>
								<ion-button @click="logout">{{
									text["logout"]
								}}</ion-button>
							</ion-item>
						</ion-card>
					</ion-col>
				</ion-row>
			</ion-grid>
			<nav-bar />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import {
	IonPage,
	IonButton,
	IonContent,
	IonGrid,
	IonCol,
	IonRow,
	IonCard,
	IonItem,
} from "@ionic/vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
	store,
	components: {
		IonPage,
		IonButton,
		IonContent,
		IonGrid,
		IonCol,
		IonRow,
		IonCard,
		IonItem,

		NavBar,
	},
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
