interface Settings {
	notifications: boolean;
	lang: string;
}

export class Account {
	constructor(
		public username?: string,
		public password?: string,
		public token?: string,
		public settings: Settings = {
			notifications: true,
			lang: "en",
		}
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
		console.log(data);
		return new Account(
			data["username"],
			data["password"],
			data["token"],
			data["settings"]
		);
	}
}