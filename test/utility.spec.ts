import { expect } from "chai";
import { Account, Settings } from "../src/utility/account";
import fixtures from "./samples/fixtures.json";

describe("Utility", () => {
    describe("Account class", () => {
        it("create", () => {
            const acc = new Account("Username", "Password", "Token", {
                className: "Class Name",
                darkMode: true,
                lang: "en",
                sendNotifications: true,
            } as Settings);

            expect(acc.username).to.equal("Username");
            expect(acc.password).to.equal("Password");
            expect(acc.token).to.equal("Token");

            expect(acc.settings.className).to.equal("Class Name");
            expect(acc.settings.darkMode).to.equal(true);
            expect(acc.settings.lang).to.equal("en");
            expect(acc.settings.sendNotifications).to.equal(true);
        });

        it("parse to json", () => {
            const acc = new Account("Username", "Password", "Token", {
                className: "Class Name",
                darkMode: true,
                lang: "en",
                sendNotifications: true,
            } as Settings);

            expect(JSON.parse(JSON.stringify(acc.toJSON()))).to.deep.equal(
                JSON.parse(fixtures["account-as-json"]),
            );
        });

        it("parse from json", () => {
            const acc = Account.fromJSON(
                JSON.parse(fixtures["account-as-json"]),
            );

            expect(acc.username).to.equal("Username");
            expect(acc.password).to.equal("Password");
            expect(acc.token).to.equal("Token");

            expect(acc.settings.className).to.equal("Class Name");
            expect(acc.settings.darkMode).to.equal(true);
            expect(acc.settings.lang).to.equal("en");
            expect(acc.settings.sendNotifications).to.equal(true);
        });
    });
});
