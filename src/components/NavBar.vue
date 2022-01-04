<template>
    <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar>
            <ion-tab-button tab="home" @click="redir('home')">
                <ion-icon :icon="planet" :color="colors['home']"></ion-icon>
            </ion-tab-button>

            <ion-tab-button tab="news" @click="redir('news')">
                <ion-icon :icon="newspaper" :color="colors['news']"></ion-icon>
            </ion-tab-button>

            <ion-tab-button tab="docnews" @click="redir('docnews')">
                <ion-icon :icon="docnews" :color="colors['docnews']"></ion-icon>
            </ion-tab-button>

            <ion-tab-button tab="settings" @click="redir('settings')">
                <ion-icon
                    :icon="settings"
                    :color="colors['settings']"></ion-icon>
            </ion-tab-button>
        </ion-tab-bar>
    </ion-tabs>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonTabs,
    IonRouterOutlet,
} from "@ionic/vue";
import {
    planet,
    settings,
    newspaper,
    documentText as docnews,
} from "ionicons/icons";

export default defineComponent({
    components: { IonTabBar, IonTabButton, IonIcon, IonTabs, IonRouterOutlet },
    data() {
        const colors: Record<string, string> = {
            home: "",
            settings: "",
            news: "",
            docnews: "",
        };
        for (const key in colors) {
            if (key == this.selected) {
                colors[key] = "primary";
            }
        }
        return { planet, settings, newspaper, docnews, colors };
    },
    props: {
        selected: {
            type: String,
        },
    },
    methods: {
        redir(route: string) {
            this.$router.push(route);
        },
    },
});
</script>
