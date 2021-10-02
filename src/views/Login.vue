<template>
	<ion-page>
		<ion-content>
			<ion-grid>
				<ion-row justify-content-center center class="title-parent">
					<ion-title class="title">myDSB</ion-title>
				</ion-row>
				<ion-row justify-content-center center>
					<ion-col size-xl="5" size-lg="6" size-md="9" size-xs="12">
						<ion-card style="text-align: center;">
							<ion-item>
								<ion-label position="floating">{{
									text["username"]
								}}</ion-label>
								<ion-input
									type="text"
									v-model="username"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-label position="floating">{{
									text["password"]
								}}</ion-label>
								<ion-input
									type="password"
									v-model="password"
								></ion-input>
							</ion-item>
							<br />
							<ion-item>
								<ion-button @click="submit" autofocus>{{
									text["login"]
								}}</ion-button>
							</ion-item>
						</ion-card>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
		<ion-footer>
			<ion-toolbar>
				<ion-progress-bar
					v-show="loadingState === 'loading'"
					type="indeterminate"
				></ion-progress-bar>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
	IonPage,
	IonContent,
	IonGrid,
	IonRow,
	IonCard,
	IonCol,
	IonInput,
	IonButton,
	IonItem,
	IonLabel,
	IonFooter,
	IonToolbar,
	IonProgressBar,
	toastController,
	IonTitle,
} from "@ionic/vue";
import store from "@/store";

interface SiteText {
	username: string;
	password: string;
	login: string;
	"credential-error": string;
	"unknown-error": string;
	"form-validation-error": "string";
}

interface Data {
	loadingProgress: string;
	loadingState: string;
	username: string;
	password: string;
	text: SiteText;
}

export default defineComponent<Data>({
	store: store,
	data() {
		store.dispatch("loadText", "login").then((val) => {
			this.text = val;
		});
		return {
			loadingState: store.state.loadingState,
			username: "",
			password: "",
			text: {},
		};
	},
	components: {
		IonPage,
		IonContent,
		IonGrid,
		IonRow,
		IonCard,
		IonCol,
		IonInput,
		IonButton,
		IonItem,
		IonLabel,
		IonTitle,
		IonFooter,
		IonToolbar,
		IonProgressBar,
	},
	methods: {
		async submit() {
			// Validate that all fields do contain at least 1 character
			if (this.username.length <= 0 || this.password.length <= 0) {
				const toast = await toastController.create({
					message: this.text["form-validation-error"],
					duration: 3000,
				});

				return toast.present();
			}
			// Login
			store
				.dispatch("login", {
					username: this.username,
					password: this.password,
				})
				.then(async () => {
					if (store.state.loadingState !== "error") {
						this.$router.push("/");
					} else {
						const toast = await toastController.create({
							message: this.text["unknown-error"],
							duration: 3000,
						});

						return toast.present();
					}
				})
				.catch(async () => {
					const toast = await toastController.create({
						message: this.text["credential-error"],
						duration: 3000,
					});

					return toast.present();
				});
		},
	},
});
</script>

<style scoped>
.title {
	font-size: xx-large;
}

.title-parent {
	text-align: center;
}
</style>