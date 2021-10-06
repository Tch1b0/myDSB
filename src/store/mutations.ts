import { Account } from "@/utility/account";
import { Storage } from "@capacitor/storage";
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
	account(state, acc: Account) {
		if (
			acc.token === undefined &&
			state.dsb !== undefined &&
			state.dsb.token !== undefined
		) {
			acc.token = state.dsb.token;
		}
		state.account = acc;
		Storage.set({ key: "account", value: JSON.stringify(acc.toJSON) });
	},
} as MutationTree<State>;
