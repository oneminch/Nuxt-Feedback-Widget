import { defineEventHandler, setResponseHeaders } from "#imports";
import { logger } from "#nuxt-feedback/lib/utils";

export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Content-Security-Policy": "default-src 'none'",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
  });

  logger.error("Missing feedback method for widget.");

  return {
    error: true,
    status: "failure",
    message: "A server error occurred. Please try again later.",
  };
});
