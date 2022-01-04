<template>
    <ion-card>
        <ion-card-content>
            <ion-card-title>{{ newsPost.title }}</ion-card-title>
            <p>{{ newsPost.detail }}</p>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonCardContent, IonCardTitle } from "@ionic/vue";
import { NewsPost } from "dsbmobile";

export default defineComponent({
    components: {
        IonCard,
        IonCardContent,
        IonCardTitle,
    },
    props: {
        newsPost: {
            type: NewsPost,
            required: true,
        },
    },
});
</script>
