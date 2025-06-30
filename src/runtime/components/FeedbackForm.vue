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
import HappyFace from "./icons/HappyFace.vue";
import SadFace from "./icons/SadFace.vue";
import NeutralFace from "./icons/NeutralFace.vue";
import type { FeedbackUIProps, FeedbackData } from "../../types";
import { cn } from "../lib/utils";

type FeedbackFormProps = Pick<
  FeedbackUIProps,
  "submitLabel" | "withTopics" | "topics"
>;

const formProps = defineProps<FeedbackFormProps>();
const formEmits = defineEmits<{
  (e: "postSubmit", status: "success" | "failure", message: string): void;
}>();

const route = useRoute();

const feedbackOptions = [
  { id: "unsatisfied", value: "Unsatisfied", label: "Sad", icon: SadFace },
  { id: "neutral", value: "Neutral", label: "Neutral", icon: NeutralFace },
  { id: "satisfied", value: "Satisfied", label: "Happy", icon: HappyFace },
];

const feedbackTopic = ref("");
const feedbackOption = ref("");
const feedbackMessage = ref("");
const validationErrorMessage = ref("");
const submissionResponseMessage = ref("");

const resetErrorMessage = () => (validationErrorMessage.value = "");

const submitFeedback = async () => {
  if (
    !feedbackOption.value.trim() ||
    (formProps.withTopics && !feedbackTopic.value.trim())
  ) {
    validationErrorMessage.value = "Please select a topic and an option.";
    return;
  }

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

  try {
    const res = await $fetch("/api/submit-feedback", {
      method: "POST",
      body: feedbackData,
    });

    if (res.error) {
      throw createError(res.message);
    }

    submissionResponseMessage.value = res.message;

    feedbackOption.value = "";
    feedbackMessage.value = "";
    feedbackTopic.value = "";

    formEmits("postSubmit", "success", res.message);
  } catch (error) {
    formEmits(
      "postSubmit",
      "failure",
      error instanceof Error
        ? error.message
        : "Unknown error. Please try again later.",
    );
  }
};
</script>

<template>
  <form @submit.prevent="submitFeedback" @change="resetErrorMessage">
    <Select v-if="withTopics" v-model="feedbackTopic">
      <SelectTrigger class="w-full mb-2.5">
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
      :class="
        cn(
          'text-xs mt-1 mb-2.5 h-4 transition-all duration-150 translate-y-0.25 opacity-0 invisible',
          {
            'translate-y-0 opacity-100 visible':
              validationErrorMessage || submissionResponseMessage,
          },
          { 'text-rose-500': validationErrorMessage },
          { 'text-green-500': submissionResponseMessage },
        )
      "
    >
      {{ validationErrorMessage || submissionResponseMessage }}
    </p>

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

    <Button class="w-full">{{ submitLabel }}</Button>
  </form>
</template>
