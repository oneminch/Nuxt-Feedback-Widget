import { createError, defineEventHandler } from "#imports";

export default defineEventHandler(() => {
  console.error("[Feedback Widget]: Please Provide a Default Feedback Method.");

  throw createError({
    statusCode: 500,
    statusMessage: "Server Error",
    message: "Submission Failed. Please Provide a Default Feedback Method.",
  });
});
