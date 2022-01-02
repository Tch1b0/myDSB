export interface Settings {
    sendNotifications: boolean;
    lang: string;
    className: string;
}

export class Account {
    constructor(
        public username?: string,
        public password?: string,
        public token?: string,
        public settings: Settings = {
            sendNotifications: true,
            lang: "de",
            className: "",
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
