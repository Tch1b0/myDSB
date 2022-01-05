export interface Settings {
    sendNotifications: boolean;
    lang: string;
    className: string;
    darkMode: boolean;
}

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

    public toJSON() {
        return {
            username: this.username,
            password: this.password,
            token: this.token,
            settings: this.settings,
        };
    }

    public static fromJSON(data: any) {
        return new Account(
            data["username"],
            data["password"],
            data["token"],
            data["settings"],
        );
    }
}
