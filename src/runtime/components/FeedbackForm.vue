<script lang="ts" setup>
import { useRoute } from "#app";
import { ref } from "vue";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import HappyFace from "./icons/HappyFace.vue";
import SadFace from "./icons/SadFace.vue";
import NeutralFace from "./icons/NeutralFace.vue";

const formProps = defineProps<{
  submitLabel?: string;
}>();

const route = useRoute();

const feedbackOptions = [
  { id: "sad", value: "sad", label: "Sad", icon: SadFace },
  { id: "neutral", value: "neutral", label: "Neutral", icon: NeutralFace },
  { id: "happy", value: "happy", label: "Happy", icon: HappyFace },
];

const feedbackOption = ref("");
const feedbackMessage = ref("");
const validationErrorMessage = ref("");

const resetErrorMessage = () => (validationErrorMessage.value = "");

const submitFeedback = async () => {
  if (!feedbackOption.value) {
    validationErrorMessage.value = "Please select an option.";
    return;
  }

  const feedbackData = {
    route: {
      fullPath: route.fullPath,
      hash: route.hash,
      query: route.query,
      name: route.name,
      path: route.path,
      redirectedFrom: route.redirectedFrom,
    },
    time: {
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    option: feedbackOption.value,
    message: feedbackMessage.value,
  };

  try {
    const res = await fetch("/api/submit-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Feedback submitted successfully:", res);

    feedbackOption.value = "";
    feedbackMessage.value = "";
  } catch (error) {
    console.error("Error submitting feedback:", error);
  }
};
</script>

<template>
  <form @submit.prevent="submitFeedback" @change="resetErrorMessage">
    <RadioGroup
      v-model="feedbackOption"
      class="flex items-center justify-evenly gap-4 border border-primary-200 p-4 mb-1 rounded-md"
      name="Feedback Option"
    >
      <RadioGroupItem
        v-for="option in feedbackOptions"
        :id="option.id"
        :key="option.id"
        :value="option.value"
        :aria-label="option.label"
      >
        <span class="-z-0">
          <component :is="option.icon" />
        </span>
      </RadioGroupItem>
    </RadioGroup>

    <p
      :class="[
        'text-rose-500 text-xs mt-1 mb-4 h-4 transition-all duration-150 translate-y-0 opacity-100 visible',
        { 'translate-y-0.25 opacity-0 invisible': !validationErrorMessage },
      ]"
    >
      {{ validationErrorMessage }}
    </p>

    <div class="mb-4">
      <Label class="mb-2 text-base font-semibold" for="message"
        >Message (Optional)</Label
      >
      <Textarea
        id="message"
        v-model="feedbackMessage"
        class="h-24 resize-y max-h-48"
        name="message"
        placeholder="Optional Message..."
      />
    </div>

    <Button class="w-full">{{ formProps.submitLabel }}</Button>
  </form>
</template>
