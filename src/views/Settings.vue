<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    {{ text["settings"] }}
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row justify-content-center center>
                    <ion-col>
                        <ion-card>
                            <ion-item>
                                <ion-label>{{ text["class-name"] }}:</ion-label>
                                <ion-input type="text" v-model="className" />
                            </ion-item>

                            <ion-item>
                                <ion-label>{{ text["lang"] }}:</ion-label>
                                <ion-select
                                    multiple="false"
                                    v-model="lang"
                                    :cancel-text="text['cancel']"
                                    :ok-text="text['ok']">
                                    <ion-select-option value="de"
                                        >Deutsch</ion-select-option
                                    >
                                    <ion-select-option value="en"
                                        >English</ion-select-option
                                    >
                                </ion-select>
                            </ion-item>

                            <ion-item>
                                <ion-label
                                    >{{
                                        text["send-notifications"]
                                    }}:</ion-label
                                >
                                <ion-toggle
                                    v-model="sendNotifications"></ion-toggle>
                            </ion-item>

                            <ion-item>
                                <ion-label>{{ text["dark-mode"] }}:</ion-label>
                                <ion-toggle v-model="darkMode"></ion-toggle>
                            </ion-item>

                            <ion-item>
                                <ion-button @click="save">{{
                                    text["save"]
                                }}</ion-button>
                            </ion-item>
                            <ion-item>
                                <ion-button @click="logout" color="danger">{{
                                    text["logout"]
                                }}</ion-button>
                            </ion-item>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <nav-bar selected="settings" />
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
    IonInput,
    IonLabel,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    IonHeader,
} from "@ionic/vue";
import NavBar from "@/components/NavBar.vue";
import { Settings } from "@/utility/account";

interface Data {
    settings: Settings;
    sendNotifications: boolean;
    className: string;
    lang: string;
    text: object;
    darkMode: boolean;
}

interface Methods {
    logout: Function;
    save: Function;
    loadText: Function;
}

export default defineComponent<Data, Methods>({
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
        IonInput,
        NavBar,
        IonLabel,
        IonToggle,
        IonSelect,
        IonSelectOption,
        IonTitle,
        IonToolbar,
        IonHeader,
    },
    data() {
        this.loadText();
        const settings = store.getters.settings;
        return {
            sendNotifications: settings.sendNotifications,
            className: settings.className,
            lang: settings.lang,
            darkMode: settings.darkMode,
            text: {},
        };
    },
    methods: {
        logout() {
            store.dispatch("logout");
        },
        save() {
            store.commit("settings", {
                className: this.className,
                sendNotifications: this.sendNotifications,
                lang: this.lang,
                darkMode: this.darkMode,
            } as Settings);
            this.loadText();
        },
        async loadText() {
            this.text = await store.dispatch("loadText", "settings");
        },
    },
    beforeRouteLeave() {
        this.save();
    },
});
</script>
