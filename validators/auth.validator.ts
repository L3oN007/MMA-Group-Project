import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

