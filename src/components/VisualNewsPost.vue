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
import { appearAnimation } from "@/utility/utils";

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
        delay: {
            type: Number,
            default: 0,
            required: false,
        },
    },
    mounted() {
        appearAnimation(this.$el, this.delay * 100);
    },
});
</script>
