import {
  defineNuxtModule,
  addVitePlugin,
  createResolver,
  addComponent,
  addServerHandler,
  addImportsDir,
} from "@nuxt/kit";

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
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    await import("@tailwindcss/vite").then((r) => addVitePlugin(r.default));

    addImportsDir(resolver.resolve("./runtime/composables"));

    _nuxt.options.css.push(
      resolver.resolve("./runtime/assets/css/tailwind.css"),
    );

    addComponent({
      name: "FeedbackWidget",
      filePath: resolver.resolve("./runtime/components/FeedbackWidget.vue"),
    });

    if (_options.feedbackStrategy === "email") {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/email.post"),
      });
    } else if (_options.feedbackStrategy === "github") {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/github.post"),
      });
    } else if (_options.feedbackStrategy === "custom-endpoint") {
      addServerHandler({
        route: "/api/submit-feedback",
        handler: resolver.resolve("./runtime/server/api/feedback/custom.post"),
      });
    } else {
      console.log("Please pick a default strategy.");
    }
  },
});
