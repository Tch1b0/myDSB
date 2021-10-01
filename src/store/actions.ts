import { Dsbmobile } from "dsbmobile";
import { ActionTree } from "vuex";
import { State } from ".";

export const actions = {
	async login(
		state,
		info: { username?: string; password?: string; token?: string }
	) {
		let dsb: Dsbmobile;
		state.commit("loadingState", "loading");
		if (info.token !== undefined) {
			dsb = new Dsbmobile(
				"",
				"",
				"https://mobileapi.dsbcontrol.de",
				info.token
			);
		} else if (info.username !== undefined && info.password !== undefined) {
			dsb = new Dsbmobile(info.username, info.password);
		} else {
			state.commit("loadingState", "error");
			return;
		}

		await dsb.fetchToken();

		state.commit("dsbApi", dsb);

		state.commit("loadingState", "done");
	},

	async update(state) {
		const dsb: Dsbmobile = state.getters.dsb;

		dsb.getTimetable().then((timeTable) => {
			state.commit("timeTable", timeTable);
		});
	},
} as ActionTree<State, State>;
