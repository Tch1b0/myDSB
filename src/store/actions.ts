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

		if (info.token !== undefined) {
			dsb = new Dsbmobile(
				"",
				"",
				"http://johannespour.de:5010",
				info.token
			);
		} else if (info.username !== undefined && info.password !== undefined) {
			dsb = new Dsbmobile(info.username, info.password);
		} else {
			state.commit("loadingState", "error");
			return;
		}

		await dsb.fetchToken();
		if (dsb.token === undefined || dsb.token.length <= 0) {
			state.commit("loadingState", "error");
			throw new WrongCredentials();
		}

		state.commit("dsbApi", dsb);

		state.commit("loadingState", "done");
	},

	async update(state) {
		const dsb: Dsbmobile = await state.getters.dsb;

		dsb.getTimetable().then((timeTable) => {
			state.commit("timeTable", timeTable);
		});
	},

	async loadText(state, page: string): Promise<object> {
		const text = await import(
			`@/../resources/text/${page}/${state.state.lang}.json`
		);

		return text;
	},
} as ActionTree<State, State>;
