<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row justify-content-center center class="title-parent">
                    <ion-title class="title">myDSB</ion-title>
                </ion-row>
                <ion-row justify-content-center center>
                    <ion-col size-xs="12">
                        <ion-card style="text-align: center">
                            <ion-item>
                                <ion-label position="floating">{{
                                    text["username"]
                                }}</ion-label>
                                <ion-input
                                    type="text"
                                    v-model="username"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">{{
                                    text["password"]
                                }}</ion-label>
                                <ion-input
                                    type="password"
                                    v-model="password"></ion-input>
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
                    v-show="store.state.loadingState === 'loading'"
                    type="indeterminate"></ion-progress-bar>
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
import { Account } from "@/utility/account";
import { LoadingStates } from "@/utility/utils";

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
    data() {
        store.dispatch("loadText", "login").then((val) => {
            this.text = val;
        });
        return {
            store,
            username: "",
            password: "",
            text: {},
        };
    },
    methods: {
        async submit(): Promise<void> {
            // Validate that all fields do contain at least 1 character
            if (this.username.length <= 0 || this.password.length <= 0) {
                const toast = await toastController.create({
                    message: this.text["form-validation-error"],
                    duration: 3000,
                });

                return toast.present();
            }
            // Login
            const acc = new Account(this.username, this.password);
            store.commit("account", acc);

            store
                .dispatch("login")
                .then(async () => {
                    if (store.state.loadingState !== LoadingStates.Error) {
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

ion-button {
    width: 100%;
    height: 75%;
    font-size: 150%;
}

@media (min-width: 1000px) {
    ion-button {
        width: 30%;
        margin-left: 35%;
    }
}
</style>
