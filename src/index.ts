import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { ENV, validateEnv } from "@config/env.config";
import fs from "fs";
import { asyncHandler } from "./utils/asyncHandler";
import { TrackRequestSchema } from "./zodSchemas/TrackEndpointRequestSchema";
import { formatZodError } from "./zodSchemas/zodErrorFormatter";
import { ITrackResponse } from "./types/track/ITrackResponse";
import path from "path";
import { createBecknErrorResponse } from "./utils/BecknErrorResponse";

dotenv.config();
const app = express();


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get("/health", (_req, res) => {
    res.status(200).json({
        message: "Server is running!",
        timestamp: new Date().toISOString(),
    });
});

const _dirname = process.cwd()

const data = fs.readFileSync(path.join(_dirname, "./src/data/beckn_on_track_500_samples.json"), "utf8")
const onTrackResponses: ITrackResponse[] = JSON.parse(data);

app.post("/search", (req, res) => {
    return res.json({ ack: { status: "ACK" } });
});

app.post("/track", asyncHandler(async (req, res) => {
    const body = req.body
    const parsedBody = TrackRequestSchema.safeParse(body)

    if (!parsedBody.success) {
        return res.status(400).json(createBecknErrorResponse(body.context, "40000", formatZodError(parsedBody.error), "ValidationError"))
    }

    const order_id = parsedBody.data.message.order_id
    const order = onTrackResponses.filter(response => response.message.tracking.parcel_id == order_id)
    if (!order.length) return res.status(404).json()

    return res.status(200).json(order)

}))


// Start server
app.listen(ENV.PORT, () => {
    console.log(`🚀 Server is running on port ${ENV.PORT}`);
    console.log(`📍 Health check: http://localhost:${ENV.PORT}/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
    process.exit(0);
});
