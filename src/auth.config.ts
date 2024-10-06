import { db } from "@/db/drizzle"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z, ZodError } from "zod"

export const CredentialsSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        pasword: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          let user = null

          const { email, password } =
            await CredentialsSchema.parseAsync(credentials)

          if (!user) {
            throw new Error("User not found.")
          }

          return user
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("ZodError: ", error.errors)
          }
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig
