import { Account, Settings } from "@/utility/account";
import { LoadingStates } from "@/utility/utils";
import { Storage } from "@ionic/storage";
import Dsbmobile, {
    DocumentPostCollection,
    NewsPostCollection,
    TimeTable,
} from "dsbmobile";
import { MutationTree } from "vuex";
import store, { State } from ".";

export const mutations = {
    dsbApi(state, dsb: Dsbmobile) {
        state.dsb = dsb;
    },
    timeTable(state, timeTable: TimeTable) {
        state.timeTable = timeTable;
    },
    newsPostCollection(state, newsPostCollection: NewsPostCollection) {
        state.newsPostCollection = newsPostCollection;
    },
    documentPostCollection(
        state,
        documentPostCollection: DocumentPostCollection,
    ) {
        state.documentPostCollection = documentPostCollection;
    },

    loadingState(state, newState: LoadingStates) {
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
    resetAccount(state) {
        state.account = new Account();
        store.state.storage.remove("account");
    },
    storage(state, storage: Storage) {
        state.storage = storage;
    },
    settings(state, settings: Settings) {
        state.account.settings = settings;
        store.state.storage.set(
            "account",
            JSON.stringify(state.account.toJSON()),
        );
    },
} as MutationTree<State>;
