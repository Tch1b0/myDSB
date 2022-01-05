<template>
    <ion-page>
        <ion-header
            ><ion-toolbar>
                <ion-title>
                    {{ text["documents"] }}
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <!--eslint-disable-next-line-->
            <ion-refresher @ionRefresh="refresh($event)" slot="fixed">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <visual-doc-post
                v-for="docPost in documentPostCollection.posts"
                :key="docPost"
                :docPost="docPost"></visual-doc-post>
            <h4
                class="background-info"
                v-if="documentPostCollection.posts.length === 0">
                {{ text["empty"] }}
            </h4>
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
    IonHeader,
    IonTitle,
    IonToolbar,
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
        IonHeader,
        IonTitle,
        IonToolbar,
        NavBar,
        VisualDocPost,
    },
    data() {
        // Sample document posts
        const tmp = new DocumentPostCollection([
            new DocumentPost(
                "ID",
                "Lorem ipsum",
                new Date(),
                "someURL",
                "somePreviewURL",
            ),
        ]);

        this.loadText();
        return {
            documentPostCollection: store.state.documentPostCollection,
            text: {},
        };
    },
    methods: {
        async refresh(event: RefresherCustomEvent) {
            await store.dispatch("update");
            event.target.complete();
        },
        async loadText() {
            this.text = await store.dispatch("loadText", "doc-news");
        },
    },
    watch: {
        "store.state.documentPostCollection"(newVal: DocumentPostCollection) {
            this.documentPostCollection = newVal;
        },
    },
    ionViewWillEnter() {
        this.loadText();
    },
});
</script>
