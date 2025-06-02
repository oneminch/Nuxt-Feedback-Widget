import {
  defineNuxtModule,
  addVitePlugin,
  createResolver,
  addComponent,
  addServerHandler,
} from "@nuxt/kit";

export interface ModuleOptions {
  text?: string;
  feedbackStrategy: "email" | "github" | "custom-endpoint";
}

const moduleConfigKey = "feedbackWidget";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "feedback-widget",
    configKey: moduleConfigKey,
  },
  // defaults: {},
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    await import("@tailwindcss/vite").then((r) => addVitePlugin(r.default));

    // Maybe don't overwrite the default css config
    _nuxt.options.css.push(
      resolver.resolve("./runtime/assets/css/tailwind.css"),
    );

    // await installModule("shadcn-nuxt", {
    //   componentDir: resolver.resolve("./runtime/components/ui"),
    // });

    addComponent({
      name: "FeedbackWidget",
      filePath: resolver.resolve("./runtime/components/FeedbackWidget.vue"),
    });

    addComponent({
      name: "FeedbackButton",
      filePath: resolver.resolve("./runtime/components/FeedbackButton.vue"),
    });

    addServerHandler({
      route: "/api/submit",
      handler: resolver.resolve("./runtime/server/api/submit.post"),
    });

    _nuxt.options.runtimeConfig.public[moduleConfigKey] = {
      feedbackStrategy: _options.feedbackStrategy,
    };

    // _nuxt.options.runtimeConfig.public[moduleConfigKey] = defu(
    //   _nuxt.options.runtimeConfig.public[moduleConfigKey],
    //   { feedbackStrategy: _options.feedbackStrategy },
    // );

    // await installModule("@nuxt/ui");

    // addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
