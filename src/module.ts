import {
  defineNuxtModule,
  addVitePlugin,
  createResolver,
  addComponent,
  addServerHandler,
  useLogger,
  addImports,
} from "@nuxt/kit";
// import { defu } from "defu";

export interface ModuleOptions {
  method: "email" | "github" | "custom-endpoint";
}

export type * from "./types";

const moduleConfigKey = "feedbackWidget";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-feedback-widget",
    configKey: moduleConfigKey,
  },
  defaults: {},
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const logger = useLogger("feedback-widget");

    if (!options.method) {
      logger.warn("[Feedback Widget]: Please Pick a Default Feedback Method.");
    }

    await import("@tailwindcss/vite").then((r) => addVitePlugin(r.default));

    nuxt.options.css.push(
      resolver.resolve("./runtime/assets/css/tailwind.css"),
    );

    addImports({
      name: "default",
      as: "useFeedbackWidget",
      from: resolver.resolve("./runtime/composables/useFeedbackWidget"),
    });

    addComponent({
      name: "FeedbackWidget",
      filePath: resolver.resolve("./runtime/components/FeedbackWidget.vue"),
    });

    if (options.method === "email") {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/email.post"),
      });
    } else if (options.method === "github") {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/github.post"),
      });
    } else if (options.method === "custom-endpoint") {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/custom.post"),
      });
    } else {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/error.post"),
      });
    }

    // const moduleRuntimeConfig = nuxt.options.runtimeConfig.public[
    //   moduleConfigKey
    // ] as Partial<ModuleOptions>;

    // nuxt.options.runtimeConfig.public[moduleConfigKey] = defu(
    //   moduleRuntimeConfig,
    //   {
    //     triggerPosition: options.triggerPosition!,
    //   },
    // );
  },
});
