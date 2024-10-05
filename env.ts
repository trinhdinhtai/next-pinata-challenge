import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    PINATA_JWT: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_GATEWAY_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GATEWAY_URL: process.env.NEXT_PUBLIC_GATEWAY_URL,
    PINATA_JWT: process.env.PINATA_JWT,
  },
})
