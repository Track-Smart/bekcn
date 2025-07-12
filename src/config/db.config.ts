import { PrismaClient } from "@generated/prisma/client";
import { ENV } from "./env.config";

declare global {
  var __prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const prisma = new PrismaClient({
    log: [
      { level: "warn", emit: "event" },
      { level: "info", emit: "event" },
      { level: "error", emit: "event" },
    ],
    errorFormat: "pretty",
    datasources: {
      db: {
        url: ENV.DATABASE_URL,
      },
    },
  });

  prisma.$on("warn", (e) => {
    console.warn("[Prisma Warning]", e);
  });

  prisma.$on("info", (e) => {
    console.info("[Prisma Info]", e);
  });

  prisma.$on("error", (e) => {
    console.error("[Prisma Error]", e);
  });

  return prisma;
};

const prisma = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

const gracefulShutdown = async () => {
  console.log("Shutting down Prisma client...");
  try {
    await prisma.$disconnect();
    console.log("Prisma client disconnected successfully");
  } catch (error) {
    console.error("Error during Prisma client disconnect:", error);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("beforeExit", gracefulShutdown);

export default prisma;
