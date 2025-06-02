import { defineEventHandler, readBody, useRuntimeConfig } from "#imports";
import { Resend } from "resend";

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

const resend = new Resend(resendApiKey);

export default defineEventHandler(async (event) => {
  const body = await readBody<FeedbackObject>(event);

  if (!body.option.trim()) {
    throw new Error("Missing Field");
  }

  // Construct message body and send
  const messageBody = JSON.stringify(body, null, 2);

  const { data, error } = await resend.emails.send({
    from: `Your Nuxt Site <${resendFrom}>`,
    to: resendTo,
    subject: "New Feedback Submission (Your Nuxt Site)",
    text: messageBody,
  });

  if (error) {
    throw new Error("Server Issue Sending Message");
  }

  return { data };
});
