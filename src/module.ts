import {
  defineNuxtModule,
  addVitePlugin,
  createResolver,
  addComponent,
  addServerHandler,
  addImportsDir,
} from "@nuxt/kit";
// import { defu } from "defu";

export interface ModuleOptions {
  text?: string;
  feedbackStrategy: "email" | "github" | "custom-endpoint";
  // feedbackUi: {};
}

const moduleConfigKey = "feedbackWidget";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "feedback-widget",
    configKey: moduleConfigKey,
  },
  defaults: {},
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    await import("@tailwindcss/vite").then((r) => addVitePlugin(r.default));

    addImportsDir(resolver.resolve("./runtime/composables"));

    nuxt.options.css.push(
      resolver.resolve("./runtime/assets/css/tailwind.css"),
    );

    addComponent({
      name: "FeedbackWidget",
      filePath: resolver.resolve("./runtime/components/FeedbackWidget.vue"),
    });

    if (options.feedbackStrategy === "email") {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/email.post"),
      });
    } else if (options.feedbackStrategy === "github") {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/github.post"),
      });
    } else if (options.feedbackStrategy === "custom-endpoint") {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/custom.post"),
      });
    } else {
      console.log("Please pick a default strategy.");
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
