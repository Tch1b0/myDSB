import { Dsbmobile, TimeTable } from "dsbmobile";
import { createStore } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";
import { Account } from "@/utility/account";
import { Storage } from "@capacitor/storage";

export interface State {
	dsb?: Dsbmobile;
	timeTable?: TimeTable;

	account: Account;
	loadingState: string;
}

export default createStore<State>({
	state: {
		dsb: undefined,
		timeTable: undefined,
		loadingState: "done",
		account: new Account(),
	},
	mutations,
	actions,
	getters,
});
