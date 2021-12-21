import { StreamType } from "@prisma/client"
import { z } from "zod"

export const CreateStream = z.object({
  name: z.string(),
  owner: z.object(
    {
      id: z.number(),
      role: z.string(),
    }
  ),
  ownerId: z.number(),
  type: z.enum(["PUBLIC", "PRIVATE", "AI", "FRIENDS"]),
})

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  email,
  password,
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
