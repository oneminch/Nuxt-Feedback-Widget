import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["../src/module"],
  feedbackWidget: {
    method: "custom-endpoint",
    customEndpoint: "/api/feedback/custom-feedback",
    siteName: "Playground",
  },
  compatibilityDate: "2025-05-19",
  css: ["~/assets/css/tailwind.css"],
  nitro: {
    preset: "github-pages",
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // allowedHosts: [".trycloudflare.com"],
    },
  },
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    resendFrom: process.env.RESEND_FROM_EMAIL,
    resendTo: process.env.RESEND_TO_EMAIL,
    githubToken: process.env.GITHUB_TOKEN,
    githubRepo: process.env.GITHUB_REPO,
    githubOwner: process.env.GITHUB_OWNER,
  },
});
