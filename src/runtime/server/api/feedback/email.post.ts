import {
  createError,
  defineEventHandler,
  readBody,
  useRuntimeConfig,
} from "#imports";
// import { Resend } from "resend";

interface FeedbackObject {
  route: {
    fullPath: string;
    hash: string;
    query: string;
    name: string;
    path: string;
    redirectedFrom: string;
  };
  time: {
    timestamp: string;
    timezone: string;
  };
  option: string;
  message: string;
}

const { resendApiKey, resendFrom, resendTo } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    if (!resendApiKey.trim() || !resendFrom.trim() || !resendTo.trim()) {
      throw createError(
        "Please add the necessary secrets to your environment variables.",
      );
    }

    // const resend = new Resend(resendApiKey);

    const body = await readBody<FeedbackObject>(event);

    if (!body.option.trim()) {
      throw createError("Feedback Form Has a Missing Field: Feedback Option");
    }

    // const messageBody = JSON.stringify(body, null, 2);

    // const { data, error } = await resend.emails.send({
    //   from: `Your Nuxt Site <${resendFrom}>`,
    //   to: resendTo,
    //   subject: "New Feedback Submission (Your Nuxt Site)",
    //   text: messageBody,
    // });

    // if (error) {
    //   throw createError("A Server Issue Has Occurred While Sending Email.");
    // }

    console.log("Feedback received:", body);

    // return {
    //   status: "success",
    //   message: "Thank you for your feedback!",
    //   data,
    // };
  } catch (error) {
    // console.log(error);
    return error;
  }
});
