import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 8000,
} as const;

export const validateEnv = () => {
  const missingVars: string[] = [];

  Object.keys(ENV).forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
        "Please set these variables in your .env file or environment.",
    );
  }

  console.log("All required environment variables are set.");
};
