export interface Settings {
    /**
     * Wether the app should to send the user notifications
     */
    sendNotifications: boolean;

    /**
     * The language, in which the text should be displayed
     * Can currently either be 'de' or 'en'
     */
    lang: "de" | "en";

    /**
     * The exact name of the Users school class
     */
    className: string;

    /**
     * Wether the dark mode should be enabled or not
     */
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
