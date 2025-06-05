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
import { useFeedbackWidget } from "#imports";
import type { FeedbackUIProps } from "../../types";

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
    <DialogContent class="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{{ uiProps.title }}</DialogTitle>
        <DialogDescription> {{ uiProps.description }} </DialogDescription>
      </DialogHeader>

      <FeedbackForm
        :submit-label="uiProps.submitLabel"
        :with-topics="uiProps.withTopics"
        :topics="uiProps.topics"
      />
    </DialogContent>
  </Dialog>
</template>
