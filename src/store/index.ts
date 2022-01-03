import Dsbmobile, {
    DocumentPostCollection,
    NewsPostCollection,
    TimeTable,
} from "dsbmobile";
import { createStore } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";
import { Account } from "@/utility/account";
import { Storage } from "@ionic/storage";
import { LoadingStates } from "@/utility/utils";

export interface State {
    // all the API/DSB variables

    /**
     * The credentials used for logging into the API
     */
    account: Account;

    /**
     * The DSB API object
     */
    dsb?: Dsbmobile;

    timeTable?: TimeTable;
    newsPostCollection?: NewsPostCollection;
    documentPostCollection?: DocumentPostCollection;

    /**
     * Wether the App is currently loading something
     */
    loadingState: LoadingStates;

    /**
     * Used for interaction with storage
     */
    storage: Storage;
}

export default createStore<State>({
    state: {
        account: new Account(),
        dsb: undefined,
        timeTable: undefined,
        newsPostCollection: undefined,
        documentPostCollection: undefined,

        loadingState: LoadingStates.Done,
        storage: new Storage(),
    },
    mutations,
    actions,
    getters,
});
