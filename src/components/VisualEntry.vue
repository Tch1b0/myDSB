<template>
    <ion-card :class="[color]" ref="b">
        <ion-card-content v-if="text !== undefined">
            <div
                v-if="text !== undefined"
                v-html="
                    formatText(
                        text[entry.type],
                        text[entry.type + '-alt'],
                        text['lang'] == 'en',
                    )
                "></div>
            <ion-icon
                :icon="check"
                style="font-size: 20px"
                @click="color = 'blue'"></ion-icon>
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import { Entry } from "dsbmobile/dist/timetable/entry";
import { defineComponent } from "vue";
import { createAnimation, IonCard, IonCardContent, IonIcon } from "@ionic/vue";
import { checkmarkDoneCircleOutline as check } from "ionicons/icons";
import store from "@/store";

export default defineComponent({
    store,
    props: {
        entry: {
            type: Entry,
        },
        delay: {
            default: 0,
            type: Number,
        },
    },
    data() {
        let color: string;
        if (this.entry === undefined) {
            color = "blue";
        } else {
            switch (this.entry.type) {
                case "Vertretung":
                    color = "green";
                    break;

                case "Betreuung":
                    color = "blue";
                    break;

                case "Raum-Vtr.":
                    color = "yellow";
                    break;

                case "Entfall":
                    color = "red";
                    break;

                default:
                    color = "blue";
                    break;
            }
        }

        this.loadText();
        return {
            color,
            check,
            text: {},
            store,
        };
    },
    mounted() {
        createAnimation()
            .addElement(this.$el)
            .duration(650)
            .delay(this.delay * 1000)
            .easing("ease-in-out")
            .fromTo("transform", "translateY(-20px)", "translateY(0px)")
            .fromTo("opacity", "0", "100%")
            .play();
    },
    methods: {
        weekDaysToEnglish(day: string): string {
            // Create an object with the english translation
            // For german weekdays
            const days: Record<string, string> = {
                Montag: "Monday",
                Dienstag: "Tuesday",
                Mittwoch: "Wednesday",
                Donnerstag: "Thursday",
                Freitag: "Friday",
                Samstag: "Saturday",
                Sonntag: "Sunday",
            };
            return days[day];
        },
        /**
         * Format a VisualEntry text
         * @param text The text you want to format
         * @param alt The "fallback" text that is used if your original text throws an error
         * @param translateToEnglish Wether certain words should be translated into english or not
         */
        formatText(
            text: string,
            alt?: string,
            translateToEnglish = false,
        ): string {
            if (this.entry === undefined || text === undefined) {
                return "";
            }

            // Do the default formatting
            text = text
                .replace(
                    "{{ day }}",
                    translateToEnglish
                        ? this.weekDaysToEnglish(this.entry.day)
                        : this.entry.day,
                )
                .replace("{{ period }}", this.entry.period.toString())
                .replace("{{ newRoom }}", this.entry.newRoom)
                .replace("{{ oldRoom }}", this.entry.oldRoom);

            try {
                if (alt !== undefined) {
                    // Do the dangerous formatting
                    return text
                        .replace("{{ oldSubject }}", this.entry.longOldSubject)
                        .replace("{{ newSubject }}", this.entry.longNewSubject);
                } else {
                    return text;
                }
            } catch (e) {
                if (alt !== undefined) {
                    // Return the "fallback" text / the alt text
                    return this.formatText(alt, undefined, translateToEnglish);
                } else {
                    console.error(e);
                    return "Some error occured :/";
                }
            }
        },
        async loadText() {
            this.text = await store.dispatch("loadText", "visual-entry");
        },
    },
    watch: {
        "store.state.account.settings"() {
            this.loadText();
        },
    },
    components: {
        IonCard,
        IonCardContent,
        IonIcon,
    },
});
</script>

<style scoped>
.green {
    color: white;
    background-color: rgba(37, 185, 37, 0.7);
}
.blue {
    color: white;
    background-color: rgba(32, 137, 223, 0.7);
}
.red {
    color: white;
    background-color: rgba(170, 17, 17, 0.7);
}
.yellow {
    color: white;
    background-color: rgba(224, 224, 77, 0.7);
}

entry-day {
    color: red;
    font-weight: 200;
}
</style>
