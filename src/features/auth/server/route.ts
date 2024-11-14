import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, signupSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { ID } from "node-appwrite";
import { AUTH_COOKIE } from "../constants";

const app = new Hono()
	.get("/current", sessionMiddleware, (c) => {
		const user = c.get("user");

		return c.json({
			data: user,
		});
	})
	.post("/login", zValidator("json", loginSchema), async (c) => {
		const { email, password } = c.req.valid("json");

		const { account } = await createAdminClient();
		const session = await account.createEmailPasswordSession(email, password);

		// Store session in cookie
		setCookie(c, AUTH_COOKIE, session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
			maxAge: 60 * 60 * 24 * 30,
		});

		return c.json({
			success: true,
		});
	})
	.post("/register", zValidator("json", signupSchema), async (c) => {
		const { name, email, password } = c.req.valid("json");

		const { account } = await createAdminClient();

		await account.create(ID.unique(), email, password, name);

		const session = await account.createEmailPasswordSession(email, password);

		// Store session in cookie
		setCookie(c, AUTH_COOKIE, session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
			maxAge: 60 * 60 * 24 * 30,
		});
		return c.json({
			success: true,
		});
	})
	.post("/logout", sessionMiddleware, async (c) => {
		const account = c.get("account");

		deleteCookie(c, AUTH_COOKIE);
		await account.deleteSession("current");

		return c.json({
			success: true,
		});
	});

export default app;
