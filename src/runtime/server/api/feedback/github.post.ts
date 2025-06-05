import {
  defineEventHandler,
  readBody /* , useRuntimeConfig */,
} from "#imports";
import type { FeedbackData } from "../../../../types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<FeedbackData>(event);
    console.log("Feedback submitted to github", body);

    return {
      status: 200,
      message: "Feedback Successfully Submitted",
    };
  } catch (error) {
    // console.log(error);
    return error;
  }
});
