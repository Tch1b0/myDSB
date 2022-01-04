<template>
    <ion-card>
        <ion-card-content>
            <ion-card-title>{{ docPost.title }}</ion-card-title>
            <br />
            <ion-thumbnail>
                <ion-img :src="docPost.previewUrl" title="Document Preview">
                </ion-img>
            </ion-thumbnail>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonThumbnail,
    IonImg,
} from "@ionic/vue";
import { DocumentPost } from "dsbmobile";

export default defineComponent({
    components: { IonCard, IonCardContent, IonCardTitle, IonThumbnail, IonImg },
    props: {
        docPost: {
            type: DocumentPost,
            required: true,
        },
    },
});
</script>
