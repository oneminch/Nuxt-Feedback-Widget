<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import FeedbackForm from "./FeedbackForm.vue";
import { ref, useFeedbackWidget, watch } from "#imports";
import type { FeedbackUIProps, SubmissionStatus } from "../../types";
import FeedbackStatus from "./FeedbackStatus.vue";

const uiProps = withDefaults(defineProps<FeedbackUIProps>(), {
  title: "Feedback",
  description: "Tell us what you think.",
  triggerLabel: "😊",
  triggerClass: "",
  submitLabel: "Submit",
  withTopics: true,
  topics: () => ["General Feedback", "Bug Report", "Feature Request"],
});

const { isOpen } = useFeedbackWidget();

const isFeedbackSubmitted = ref(false);
const submissionStatus = ref({
  status: "" as SubmissionStatus,
  message: "",
});

const handlePostSubmit = (status: "success" | "failure", message: string) => {
  isFeedbackSubmitted.value = true;
  submissionStatus.value = { status, message };
};

watch(isOpen, (newValue) => {
  if (!newValue) {
    isFeedbackSubmitted.value = false;
    submissionStatus.value = { status: "" as SubmissionStatus, message: "" };
  }
});
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button
        :class="
          cn('inline-flex items-center justify-center', uiProps.triggerClass)
        "
      >
        {{ uiProps.triggerLabel }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-sm text-zinc-900 dark:text-zinc-50">
      <template v-if="!isFeedbackSubmitted">
        <DialogHeader>
          <DialogTitle>{{ uiProps.title }}</DialogTitle>
          <DialogDescription> {{ uiProps.description }} </DialogDescription>
        </DialogHeader>

        <FeedbackForm
          :submit-label="uiProps.submitLabel"
          :with-topics="uiProps.withTopics"
          :topics="uiProps.topics"
          @post-submit="handlePostSubmit"
        />
      </template>

      <template v-else>
        <FeedbackStatus
          v-if="isFeedbackSubmitted"
          :status="submissionStatus.status"
          :message="submissionStatus.message"
        />
      </template>
    </DialogContent>
  </Dialog>
</template>
