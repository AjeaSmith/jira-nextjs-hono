import { z } from "zod";

export const createWorkSpaceSchema = z.object({
	name: z.string().trim().min(1, "Required"),
});
