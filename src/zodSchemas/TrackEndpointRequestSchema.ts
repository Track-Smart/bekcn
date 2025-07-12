
import { z } from "zod";

const ContextSchema = z.object({
  domain: z.literal("nic2004:55204"), // logistics domain code
  country: z.literal("IND"),           // only India for your case
  city: z.string(),                    // e.g., "std:080"
  action: z.literal("track"),
  core_version: z.literal("0.9.1"),
  bap_id: z.string().url(),
  bap_uri: z.string().url(),
  bpp_id: z.string().url(),
  bpp_uri: z.string().url(),
  transaction_id: z.string(),
  message_id: z.string(),
  timestamp: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid timestamp format"
  }),
  key: z.string().optional(),
  ttl: z.string().optional()
});

export const TrackRequestSchema = z.object({
  context: ContextSchema,
  message: z.object({
    order_id: z.string().min(1, "order_id is required"),
    callback_url: z.string().url().optional()
  })
});
