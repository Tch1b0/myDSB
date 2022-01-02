<template>
    <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar>
            <ion-tab-button tab="home" @click="redir('home')">
                <ion-icon :icon="planet" :color="colors['home']"></ion-icon>
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
import { planet, settings } from "ionicons/icons";

export default defineComponent({
    components: { IonTabBar, IonTabButton, IonIcon, IonTabs, IonRouterOutlet },
    data() {
        const colors: Record<string, string> = {
            home: "",
            settings: "",
        };
        for (const key in colors) {
            if (key == this.selected) {
                colors[key] = "primary";
            }
        }
        return { planet, settings, colors };
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
