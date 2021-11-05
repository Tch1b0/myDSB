import router from "@/router";
import Dsbmobile, { WrongCredentials } from "dsbmobile";
import { ActionTree } from "vuex";
import { State } from ".";

interface DsbLoginInfo {
	token?: string;
	username?: string;
	password?: string;
}

export const actions = {
	async login(state) {
		const account = state.state.account;
		let dsb: Dsbmobile;
		state.commit("loadingState", "loading");

		const apiURL = "https://mydsb.johannespour.de";
		const resURL = "https://mydsb.johannespour.de/light";

		if (account.token !== undefined) {
			dsb = new Dsbmobile({
				baseURL: apiURL,
				resourceBaseURL: resURL,
				token: account.token,
			});
		} else if (
			account.username !== undefined &&
			account.password !== undefined
		) {
			dsb = new Dsbmobile({
				id: account.username,
				password: account.password,
				baseURL: apiURL,
				resourceApiURL: resURL,
			});
			await dsb.fetchToken();
		} else {
			state.commit("loadingState", "error");
			return;
		}

		if (dsb.token === undefined || dsb.token.length <= 0) {
			state.commit("loadingState", "error");
			throw new WrongCredentials();
		}

		state.commit("dsbApi", dsb);

		state.commit("loadingState", "done");
	},
	logout(state) {
		state.commit("resetAccount");
		router.push("login");
	},

	async update(state) {
		const dsb: Dsbmobile = await state.getters.dsb;

		state.commit("timeTable", await dsb.getTimetable());
	},

	async loadText(state, page: string): Promise<object> {
		const text = await import(
			`@/../resources/text/${page}/${state.state.account.settings.lang}.json`
		);

		return text;
	},
} as ActionTree<State, State>;
