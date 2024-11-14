import "server-only";
import {
	Account,
	Client,
	Databases,
	Users,
	Storage,
	Models,
	type Account as AccountType,
	type Databases as DatabasesType,
	type Storage as StorageType,
	type Users as UsersType,
} from "node-appwrite";
import { createMiddleware } from "hono/factory";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { getCookie } from "hono/cookie";

type AdditionalContext = {
	Variables: {
		account: AccountType;
		databases: DatabasesType;
		storage: StorageType;
		users: UsersType;
		user: Models.User<Models.Preferences>;
	};
};
export const sessionMiddleware = createMiddleware<AdditionalContext>(
	async (c, next) => {
		const client = new Client()
			.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
			.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!); // Your project ID

		const session = getCookie(c, AUTH_COOKIE);

		if (!session) {
			return c.json(
				{
					error: "Unauthorized",
				},
				401
			);
		}

		client.setSession(session);

		const account = new Account(client);
		const databases = new Databases(client);
		const storage = new Storage(client);

		const user = await account.get();

		c.set("account", account);
		c.set("databases", databases);
		c.set("storage", storage);
		c.set("user", user);

		await next();
	}
);
