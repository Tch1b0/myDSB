<template>
    <ion-page>
        <ion-content>
            <!--eslint-disable-next-line-->
            <ion-refresher @ionRefresh="refresh($event)" slot="fixed">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <div
                v-if="
                    timeTable !== undefined &&
                    timeTable.findByClassName(settings.className).length === 0
                ">
                <h2 style="text-align: center">
                    {{ text["empty"] }}
                </h2>
            </div>
            <div v-else-if="timeTable !== undefined">
                <div style="text-align: center">
                    <h3>
                        {{ timeTable.entries.length }} {{ text["entries"] }}
                    </h3>
                </div>
                <div
                    v-for="(entry, index) of timeTable.findByClassName(
                        settings.className,
                    )"
                    :key="(entry, index)">
                    <visual-entry :entry="entry" :delay="index"></visual-entry>
                </div>
            </div>
            <nav-bar selected="home" />
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
        this.loadText();
        return {
            settings,
            store,
            timeTable: store.state.timeTable,
            text: {},
        };
    },
    methods: {
        async refresh(event: any) {
            await store.dispatch("update");
            console.log(this.timeTable);
            event.target.complete();
        },
        async loadText() {
            this.text = await store.dispatch("loadText", "home");
        },
    },
    watch: {
        "store.state.account.settings"(val: any): void {
            this.settings = val;
        },
        "store.state.timeTable"(val: any): void {
            this.timeTable = val;
        },
    },
    ionViewWillEnter() {
        this.loadText();
    },
});
</script>
