export interface Settings {
    sendNotifications: boolean;
    lang: string;
    className: string;
    darkMode: boolean;
}

/**
 * A myDSB account, which stores User information locally
 */
export class Account {
    constructor(
        public username?: string,
        public password?: string,
        public token?: string,
        public settings: Settings = {
            sendNotifications: true,
            lang: window.navigator.language === "de" ? "de" : "en",
            className: "",
            darkMode: false,
        },
    ) {}

    /**
     * @returns a new Object, ready to be stringified
     */
    public toJSON() {
        return {
            username: this.username,
            password: this.password,
            token: this.token,
            settings: this.settings,
        };
    }

    /**
     * Create a new Account object from json
     * @param data The json data
     * @returns a new Account object
     */
    public static fromJSON(data: any) {
        return new Account(
            data["username"],
            data["password"],
            data["token"],
            data["settings"],
        );
    }
}
