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

interface FeedbackUIProps {
  title?: string;
  description?: string;
  triggerLabel?: string;
  triggerClass?: string;
  submitLabel?: string;
}

const uiProps = withDefaults(defineProps<FeedbackUIProps>(), {
  title: "Feedback",
  description: "Tell us what you think.",
  triggerLabel: "😊",
  triggerClass: "",
  submitLabel: "Submit",
});

const { isOpen } = useFeedbackWidget();
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button
        :class="
          cn(
            'text-white inline-flex items-center justify-center',
            uiProps.triggerClass,
          )
        "
      >
        {{ uiProps.triggerLabel }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ uiProps.title }}</DialogTitle>
        <DialogDescription> {{ uiProps.description }} </DialogDescription>
      </DialogHeader>

      <section>
        <FeedbackForm :submit-label="uiProps.submitLabel" />
      </section>
    </DialogContent>
  </Dialog>
</template>
