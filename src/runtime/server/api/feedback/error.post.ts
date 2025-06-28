import { defineEventHandler } from "#imports";
import { logger } from "../../../lib/utils";

export default defineEventHandler(() => {
  logger.error("Missing email environment variables for feedback widget.");

  return {
    error: true,
    status: "failure",
    message: "A server error occurred. Please try again later.",
  };
});
