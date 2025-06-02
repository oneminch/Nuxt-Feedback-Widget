import { defineEventHandler, readBody, useRuntimeConfig } from "#imports";
import resend from "../utils/resend";

const { feedbackStrategy } = useRuntimeConfig().public.feedbackWidget as {
  feedbackStrategy: string;
};

export default defineEventHandler(async (event) => {
  if (feedbackStrategy === "email") {
    try {
      const data = await resend(event);

      return {
        status: "success",
        message: "Thank you for your feedback!",
        data,
      };
    } catch (error) {
      // console.log(error);
      return error;
    }
  } else {
    console.log("Feedback received:", await readBody(event));
    // Respond with a success message
    // return {
    //   status: "success",
    //   message: "Thank you for your feedback!",
    // };
  }
});
