import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const signupSchema = z.object({
	name: z.string().trim().min(1, "Required"),
	email: z.string().email(),
	password: z.string().min(8, "Minimum 8 characters required"),
});
