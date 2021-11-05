<template>
	<ion-card :class="[color]">
		<ion-card-content v-if="text !== undefined">
			<div
				v-if="text !== undefined"
				v-html="formatText(text[entry.type])"
			></div>
			<ion-icon :icon="check" style="font-size: 20px"></ion-icon>
		</ion-card-content>
	</ion-card>
</template>

<script lang="ts">
import { Entry } from "dsbmobile/dist/timetable/entry";
import { defineComponent } from "vue";
import { IonCard, IonCardContent, IonIcon } from "@ionic/vue";
import { checkmarkDoneCircleOutline as check } from "ionicons/icons";
import store from "@/store";

interface Data {
	color: string;
	check: string;
	text: object;
	store: object;
}

export default defineComponent({
	store,
	props: {
		entry: Entry,
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
	methods: {
		formatText(text: string) {
			if (this.entry === undefined || text === undefined) {
				return "";
			}

			try {
				return text
					.replace("{{ day }}", this.entry.day)
					.replace("{{ period }}", this.entry.period.toString())
					.replace("{{ oldSubject }}", this.entry.longOldSubject)
					.replace("{{ newSubject }}", this.entry.longNewSubject)
					.replace("{{ newRoom }}", this.entry.newRoom)
					.replace("{{ oldRoom }}", this.entry.oldRoom);
			} catch {
				return "Some error occured :/";
			}
		},
		async loadText() {
			this.text = await store.dispatch("loadText", "visual-entry");
		},
	},
	watch: {
		"store.state.account.settings"(_) {
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
