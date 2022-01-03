<template>
    <ion-page>
        <ion-content>
            <!--eslint-disable-next-line-->
            <ion-refresher @ionRefresh="refresh($event)" slot="fixed">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <visual-news-post
                v-for="newsPost in newsPostCollection.posts"
                :key="newsPost"
                :newsPost="newsPost"></visual-news-post>
            <nav-bar selected="news" />
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
import VisualNewsPost from "@/components/VisualNewsPost.vue";
import store from "@/store";
import { NewsPost, NewsPostCollection } from "dsbmobile";

export default defineComponent({
    store,
    components: {
        IonPage,
        IonRefresher,
        IonRefresherContent,
        IonContent,
        NavBar,
        VisualNewsPost,
    },
    data() {
        const tmp = new NewsPostCollection([
            new NewsPost(
                "Irgndwelche Neuigkeiten",
                new Date(),
                "Lorem ipsum somet amet lorem ipsum somet amet",
            ),
        ]);
        return {
            store,
            newsPostCollection: store.state.newsPostCollection || tmp,
        };
    },
    methods: {
        refresh(event: RefresherCustomEvent) {
            console.log(this.newsPostCollection);
            event.target.complete();
        },
    },
    watch: {
        "store.state.newsPostCollection"(newVal: NewsPostCollection) {
            this.newsPostCollection = newVal;
        },
    },
});
</script>
