<script lang="ts" setup>
import { useState } from "#imports";
import Button from "./ui/button/Button.vue";

const toggleFeedbackWidget = () => {
  widgetVisible.value = !widgetVisible.value;
};

const widgetVisible = useState<boolean>("feedback-widget-visible", () => false);
</script>

<template>
  <Button
    class="fixed bottom-6 right-6 bg-lime-500 text-white rounded-2xl rounded-br-sm size-12 text-2xl cursor-pointer leading-none flex items-center justify-center"
    @click="toggleFeedbackWidget"
  >
    😊
  </Button>
</template>
