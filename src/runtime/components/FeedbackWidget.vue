<script setup lang="ts">
import { useState } from "#app";
import FeedbackForm from "./FeedbackForm.vue";

// defineOptions({
//   name: "FeedbackWidget",
// });

// const handleClick = () => console.log("hello!");

const widgetVisible = useState<boolean>("feedback-widget-visible");
</script>

<template>
  <div
    v-if="widgetVisible"
    id="feedback-widget-overlay"
    @click.self="widgetVisible = false"
  >
    <section id="feedback-widget">
      <FeedbackForm />
    </section>
  </div>
</template>

<style scoped>
#feedback-widget-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

#feedback-widget {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
