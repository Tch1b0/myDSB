import { Account } from "@/utility/account";
import { Storage } from "@ionic/storage";
import { Dsbmobile, TimeTable } from "dsbmobile";
import { MutationTree } from "vuex";
import store, { State } from ".";

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
		store.state.storage.set("account", JSON.stringify(acc.toJSON()));
	},
	storage(state, storage: Storage) {
		state.storage = storage;
	},
} as MutationTree<State>;
