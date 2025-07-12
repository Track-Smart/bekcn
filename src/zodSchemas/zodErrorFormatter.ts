
import { Request, Response } from "express";
import { ZodError } from "zod";

export function formatZodError(err: ZodError): string[] {
  return err.errors.map(e => `${e.path.join(".")}: ${e.message}`);
}

// export function handleZodError(
//   err: ZodError,
//   req: Request,
//   res: Response,
//   action: string
// ) {
//   const now = new Date().toISOString();
//
//   const errorResponse = {
//     context: {
//       domain: "nic2004:55204",
//       country: "IND",
//       city: "std:unknown",
//       action: `on_${action}`,
//       core_version: "0.9.1",
//       bap_id: "https://buyer-app.example.com",
//       bap_uri: "https://buyer-app.example.com/beckn",
//       transaction_id: "NA",
//       message_id: "NA",
//       timestamp: now
//     },
//     error: {
//       code: "30009",
//       message: "Invalid request payload",
//       type: "ProtocolError",
//       path: req.path,
//       details: formatZodError(err)
//     }
//   };
//
//   res.status(400).json(errorResponse);
// }
