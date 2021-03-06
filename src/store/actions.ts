import router from "@/router";
import { LoadingStates } from "@/utility/utils";
import Dsbmobile, { WrongCredentials } from "dsbmobile";
import { ActionTree } from "vuex";
import { State } from ".";

export const actions = {
    // log the user in using a token OR username and password
    async login(state) {
        const account = state.state.account;
        let dsb: Dsbmobile;
        state.commit("loadingState", LoadingStates.Loading);

        const apiURL = "https://mydsb.johannespour.de";
        const resURL = "https://mydsb.johannespour.de/light";

        // if the account token is accessable, log in using
        // the token
        if (account.token !== undefined) {
            dsb = new Dsbmobile({
                baseURL: apiURL,
                resourceBaseURL: resURL,
                token: account.token,
            });
        }

        // otherwise, log in using the username and password, if possible
        else if (
            account.username !== undefined &&
            account.password !== undefined
        ) {
            dsb = new Dsbmobile({
                id: account.username,
                password: account.password,
                baseURL: apiURL,
                resourceApiURL: resURL,
            });
            await dsb.fetchToken();
        }

        // else, show an error when loading
        else {
            state.commit("loadingState", LoadingStates.Error);
            return;
        }

        if (dsb.token === undefined || dsb.token.length <= 0) {
            state.commit("loadingState", LoadingStates.Error);
            throw new WrongCredentials();
        }

        state.commit("dsbApi", dsb);

        state.commit("loadingState", LoadingStates.Done);
    },

    // log out from the current account
    logout(state) {
        state.commit("resetAccount");
        router.push("login");
    },

    // fetch all data fetchable
    async update(state) {
        const dsb: Dsbmobile = await state.getters.dsb;

        state.commit("timeTable", await dsb.getTimetable());
        state.commit("newsPostCollection", await dsb.getNewsPosts());
        state.commit("documentPostCollection", await dsb.getDocumentPosts());
    },

    // load the text for a certain page in a certain language
    async loadText(state, page: string): Promise<object> {
        const text = await import(
            `@/../resources/text/${page}/${state.state.account.settings.lang}.json`
        );

        return text;
    },

    getVisibleClassNames(state): string[] {
        const timeTable = state.state.timeTable;
        if (timeTable === undefined) return [];

        const classNames: string[] = [];

        for (const entry of timeTable.entries) {
            for (const className of entry.className) {
                if (!classNames.includes(className)) {
                    classNames.push(className);
                }
                console.log(className);
            }
        }

        return classNames;
    },
} as ActionTree<State, State>;
