import { Dsbmobile, TimeTable } from "dsbmobile";
import { createStore } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

export interface State {
	dsb?: Dsbmobile;
	timeTable?: TimeTable;

	loadingState: string;

	lang: string;
}

export default createStore<State>({
	state: {
		dsb: undefined,
		timeTable: undefined,
		loadingState: "done",
		lang: "de",
	},
	mutations,
	actions,
	getters,
});