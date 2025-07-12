
import { z } from "zod";

const AddressSchema = z.object({
  door: z.string().optional(),
  building: z.string().optional(),
  street: z.string().optional(),
  area: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string().optional(),
});

const LocationSchema = z.object({
  gps: z.string().regex(/^[-+]?[0-9]*\.?[0-9]+,[-+]?[0-9]*\.?[0-9]+$/),
  address: AddressSchema,
});

const TimeSchema = z.string().datetime().optional(); // ISO8601 format

const FulfillmentSchema = z.object({
  id: z.string(), // use this for order or tracking ID
  type: z.string().default("PhysicalDelivery"),
  start: z
    .object({
      location: LocationSchema,
      time: TimeSchema.optional(),
    })
    .optional(), // <-- now optional
  end: z
    .object({
      location: LocationSchema,
      time: TimeSchema.optional(),
    })
    .optional(), // <-- now optional
});

const CategorySchema = z.object({
  id: z.string(),
  descriptor: z.object({
    name: z.string(),
  }),
});

const IntentSchema = z.object({
  category: CategorySchema.optional(),
  fulfillment: FulfillmentSchema,
  tags: z.record(z.string()).optional(), // key-value pairs like fragile: "true"
});

const ContextSchema = z.object({
  domain: z.string(),
  country: z.string(),
  city: z.string(),
  action: z.literal("search"),
  core_version: z.string(),
  bap_id: z.string().url(),
  bap_uri: z.string().url(),
  transaction_id: z.string(),
  message_id: z.string(),
  timestamp: z.string().datetime(),
});

export const BecknSearchRequestBodySchema = z.object({
  context: ContextSchema,
  message: z.object({
    intent: IntentSchema,
  }),
});
