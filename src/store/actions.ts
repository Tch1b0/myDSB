import { Dsbmobile, WrongCredentials } from "dsbmobile";
import { ActionTree } from "vuex";
import { State } from ".";

interface DsbLoginInfo {
	token?: string;
	username?: string;
	password?: string;
}

export const actions = {
	async login(state, info: DsbLoginInfo) {
		console.log(info.password);
		let dsb: Dsbmobile;

		state.commit("loadingState", "loading");
		state.commit("loadingProgress", 0.1);

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
			state.commit("loadingProgress", 1);
			return;
		}

		state.commit("loadingProgress", 0.4);
		await dsb.fetchToken();
		if (dsb.token === undefined || dsb.token.length <= 0) {
			state.commit("loadingState", "error");
			throw new WrongCredentials();
		}
		state.commit("loadingProgress", 0.8);

		state.commit("dsbApi", dsb);

		state.commit("loadingProgress", 1);
		state.commit("loadingState", "done");
	},

	async update(state) {
		const dsb: Dsbmobile = await state.getters.dsb;

		dsb.getTimetable().then((timeTable) => {
			state.commit("timeTable", timeTable);
		});
	},
} as ActionTree<State, State>;
