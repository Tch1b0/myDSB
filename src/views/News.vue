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
                "Lorem ipsum",
                new Date(),
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            ),
        ]);
        return {
            newsPostCollection: tmp, //store.state.newsPostCollection
        };
    },
    methods: {
        async refresh(event: RefresherCustomEvent) {
            await store.dispatch("update");
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
