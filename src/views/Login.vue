<template>
	<ion-page>
		<ion-content>
			<ion-grid>
				<ion-row justify-content-center center>
					<ion-col size-xl="5" size-lg="6" size-md="9" size-xs="12">
						<ion-card style="text-align: center;">
							<ion-item>
								<ion-label position="floating"
									>Username</ion-label
								>
								<ion-input
									type="text"
									v-model="username"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-label position="floating"
									>Password</ion-label
								>
								<ion-input
									type="password"
									v-model="password"
								></ion-input>
							</ion-item>
							<br />
							<ion-item>
								<ion-button @click="submit" autofocus
									>Log in</ion-button
								>
							</ion-item>
						</ion-card>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
		<ion-footer>
			<ion-toolbar>
				<ion-progress-bar
					:value="loadingProgress"
					v-if="loadingState === 'loading'"
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
} from "@ionic/vue";
import store from "@/store";

export default defineComponent({
	store: store,
	data() {
		return {
			loadingProgress: store.state.loadingProgress,
			loadingState: store.state.loadingState,
			username: "",
			password: "",
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
		IonFooter,
		IonToolbar,
		IonProgressBar,
	},
	methods: {
		async submit() {
			// Validate that all fields do contain at least 1 character
			if (this.username.length <= 0 || this.password.length <= 0) {
				const toast = await toastController.create({
					message: "Please make sure to fill out all fields",
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
							message: "Something went wrong :/",
							duration: 3000,
						});

						return toast.present();
					}
				})
				.catch(async () => {
					const toast = await toastController.create({
						message: "Wrong Password or Username",
						duration: 3000,
					});

					return toast.present();
				});
		},
	},
});
</script>
