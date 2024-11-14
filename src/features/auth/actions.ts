import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";

export async function getCurrent() {
	try {
		const client = new Client()
			.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
			.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

		const session = (await cookies()).get(AUTH_COOKIE);

		if (!session) return null;

		client.setSession(session.value);

		const account = new Account(client);

		return await account.get();
	} catch (error) {
		return null;
	}
}
