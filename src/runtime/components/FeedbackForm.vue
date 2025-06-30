<script lang="ts" setup>
import { useRoute, ref, createError } from "#imports";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import FormValidationMessage from "./FormValidationMessage.vue";
import type { FeedbackUIProps, FeedbackData } from "../../types";
import { feedbackOptions } from "../lib/defaults";

const formProps =
  defineProps<Pick<FeedbackUIProps, "submitLabel" | "withTopics" | "topics">>();

const formEmits = defineEmits<{
  (e: "postSubmit", status: "success" | "failure", message: string): void;
}>();

const route = useRoute();

const feedbackTopic = ref("");
const feedbackOption = ref("");
const feedbackMessage = ref("");

const errors = ref<{ topic?: string; option?: string }>({});
const isSubmitting = ref(false);

const validate = () => {
  errors.value = {};

  if (formProps.withTopics && !feedbackTopic.value.trim()) {
    errors.value.topic = "Please select a topic.";
  }

  if (!feedbackOption.value.trim()) {
    errors.value.option = "Please select an option.";
  }

  return Object.keys(errors.value).length === 0;
};

const resetErrors = () => (errors.value = {});

const submitFeedback = async () => {
  if (!validate()) return;

  const feedbackData = {
    metadata: {
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
    },
    topic: feedbackTopic.value,
    option: feedbackOption.value,
    message: feedbackMessage.value,
  } satisfies FeedbackData;

  isSubmitting.value = true;

  try {
    const res = await $fetch("/api/submit-feedback", {
      method: "POST",
      body: feedbackData,
    });

    if (res.error) {
      throw createError(res.message);
    }

    formEmits("postSubmit", "success", res.message);
  } catch (error) {
    formEmits(
      "postSubmit",
      "failure",
      error instanceof Error
        ? error.message
        : "Unknown error. Please try again later.",
    );
  } finally {
    feedbackOption.value = "";
    feedbackMessage.value = "";
    feedbackTopic.value = "";
    resetErrors();

    isSubmitting.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submitFeedback" @change="resetErrors">
    <Select v-if="withTopics" v-model="feedbackTopic">
      <SelectTrigger class="w-full">
        <SelectValue placeholder="Select a topic" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="topic in topics" :key="topic" :value="topic">
            {{ topic }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <FormValidationMessage v-if="withTopics" :error-message="errors.topic" />

    <RadioGroup
      v-model="feedbackOption"
      class="flex items-center justify-evenly gap-4 border border-primary-200 p-4 rounded-md"
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

    <FormValidationMessage :error-message="errors.option" />

    <div class="mb-5">
      <Label class="mb-1.5 text-base font-semibold" for="message"
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

    <Button
      class="w-full"
      :disabled="isSubmitting"
      :aria-disabled="isSubmitting"
    >
      {{ isSubmitting ? "Submitting..." : submitLabel }}
    </Button>
  </form>
</template>
