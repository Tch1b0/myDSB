import { GetterTree } from "vuex";
import { State } from ".";

export const getters = {
	dsb: (state) => state.dsb,
	settings: (state) => state.account.settings,
} as GetterTree<State, State>;
