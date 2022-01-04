<template>
    <ion-page>
        <ion-content>
            <!--eslint-disable-next-line-->
            <ion-refresher @ionRefresh="refresh($event)" slot="fixed">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <visual-doc-post
                v-for="docPost in documentPostCollection.posts"
                :key="docPost"
                :docPost="docPost"></visual-doc-post>
            <nav-bar selected="docnews" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { RefresherCustomEvent } from "@ionic/core";
import { defineComponent } from "vue";
import {
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonContent,
} from "@ionic/vue";
import NavBar from "@/components/NavBar.vue";
import VisualDocPost from "@/components/VisualDocPost.vue";
import store from "@/store";
import { DocumentPostCollection, DocumentPost } from "dsbmobile";

export default defineComponent({
    store,
    components: {
        IonPage,
        IonRefresher,
        IonRefresherContent,
        IonContent,
        NavBar,
        VisualDocPost,
    },
    data() {
        const tmp = new DocumentPostCollection([
            new DocumentPost(
                "ID",
                "Irgndwelche Neuigkeiten",
                new Date(),
                "someURL",
                "somePreviewURL",
            ),
        ]);
        return {
            store,
            documentPostCollection: tmp, //store.state.documentPostCollection,
        };
    },
    methods: {
        async refresh(event: RefresherCustomEvent) {
            await this.store.dispatch("update");
            event.target.complete();
        },
    },
    watch: {
        "store.state.documentPostCollection"(newVal: DocumentPostCollection) {
            this.documentPostCollection = newVal;
        },
    },
});
</script>
