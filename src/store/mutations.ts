import { Dsbmobile, TimeTable } from "dsbmobile";
import { MutationTree } from "vuex";
import { State } from ".";

export const mutations = {
	dsbApi(state, dsb: Dsbmobile) {
		state.dsb = dsb;
	},
	timeTable(state, timeTable: TimeTable) {
		state.timeTable = timeTable;
	},
	loadingState(state, newState: string) {
		state.loadingState = newState;
	},
} as MutationTree<State>;
