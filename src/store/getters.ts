import { GetterTree } from "vuex";
import { State } from ".";

export const getters = {
	dsb: (state) => state.dsb,
} as GetterTree<State, State>;
