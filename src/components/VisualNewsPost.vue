<template>
    <ion-card>
        <ion-card-content>
            <h4>{{ newsPost.title }}</h4>
            <p>{{ newsPost.detail }}</p>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonCardContent } from "@ionic/vue";
import { NewsPost } from "dsbmobile";

export default defineComponent({
    components: {
        IonCard,
        IonCardContent,
    },
    props: {
        newsPost: {
            type: NewsPost,
            required: true,
        },
    },
});
</script>
