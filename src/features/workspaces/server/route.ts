import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkSpaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";

const app = new Hono().post(
	"/",
	zValidator("json", createWorkSpaceSchema),
	sessionMiddleware,
	async (c) => {
		const databases = c.get("databases");
		const user = c.get("user");

		const { name } = c.req.valid("json");

		const workspaces = await databases.createDocument(
			DATABASE_ID,
			WORKSPACES_ID,
			ID.unique(),
			{
				name,
				userId: user.$id,
			}
		);

		return c.json({ data: workspaces });
	}
);

export default app;
