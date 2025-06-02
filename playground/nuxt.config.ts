export default defineNuxtConfig({
  modules: ["../src/module"],
  feedbackWidget: {
    text: "Hi there!",
    feedbackStrategy: "github",
  },
  devtools: { enabled: true },
  compatibilityDate: "2025-05-19",
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    resendFrom: process.env.RESEND_FROM_EMAIL,
    resendTo: process.env.RESEND_TO_EMAIL,
  },
});
