import * as z from "zod";

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;

export const SignUpFormSchema = z
  .object({
    email: z.string().email({ message: "Email is invalid" }),
    fullName: z
      .string({ message: "Name is required" })
      .min(1, { message: "Name must be at least 1 character" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    dob: z.string(),
    phoneNumber: z
      .string({ message: "Phone number is required" })
      .regex(/^\+\d{1,3}\d{4,14}(?:x\d+)?$/, {
        message: "Invalid phone number format",
      }),
    imageUrl: z.string().url({ message: "Image URL is invalid" }),
    address: z
      .string()
      .min(1, { message: "Address must be at least 1 character" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

