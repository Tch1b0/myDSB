import { Dsbmobile, TimeTable } from "dsbmobile";
import { createStore } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";
import { Account } from "@/utility/account";
import { Storage } from "@ionic/storage";

export interface State {
	dsb?: Dsbmobile;
	timeTable?: TimeTable;

	account: Account;
	loadingState: string;
	storage: Storage;
}

export default createStore<State>({
	state: {
		dsb: undefined,
		timeTable: undefined,
		loadingState: "done",
		account: new Account(),
		storage: new Storage(),
	},
	mutations,
	actions,
	getters,
});
