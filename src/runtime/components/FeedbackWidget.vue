<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import FeedbackForm from "./FeedbackForm.vue";
import { computed, ref, useFeedbackWidget, watch } from "#imports";
import type { FeedbackUIProps, SubmissionStatus } from "../../types";
import FeedbackStatus from "./FeedbackStatus.vue";
import { useMediaQuery } from "@vueuse/core";

withDefaults(defineProps<FeedbackUIProps>(), {
  title: "Feedback",
  description: "Tell us what you think.",
  triggerLabel: "Share Feedback",
  triggerClass: "",
  submitLabel: "Submit",
  withTopics: true,
  topics: () => ["General Feedback", "Bug Report", "Feature Request"],
});

const { isOpen } = useFeedbackWidget();
const isDesktop = useMediaQuery("(min-width: 640px)");

const isFeedbackSubmitted = ref(false);
const submissionStatus = ref({
  status: "" as SubmissionStatus,
  message: "",
});

const handleAfterSubmit = (status: "success" | "failure", message: string) => {
  isFeedbackSubmitted.value = true;
  submissionStatus.value = { status, message };
};

const Modal = computed(() => ({
  Root: isDesktop.value ? Dialog : Drawer,
  Trigger: isDesktop.value ? DialogTrigger : DrawerTrigger,
  Content: isDesktop.value ? DialogContent : DrawerContent,
  Header: isDesktop.value ? DialogHeader : DrawerHeader,
  Title: isDesktop.value ? DialogTitle : DrawerTitle,
  Description: isDesktop.value ? DialogDescription : DrawerDescription,
}));

watch(isOpen, (newValue: boolean) => {
  if (!newValue) {
    isFeedbackSubmitted.value = false;
    submissionStatus.value = { status: "" as SubmissionStatus, message: "" };
  }
});
</script>

<template>
  <component :is="Modal.Root" v-model:open="isOpen">
    <component :is="Modal.Trigger" as-child>
      <Button
        :class="cn('inline-flex items-center justify-center', triggerClass)"
      >
        {{ triggerLabel }}
      </Button>
    </component>
    <component
      :is="Modal.Content"
      class="sm:max-w-sm px-2 *:px-4 text-zinc-900 dark:text-zinc-50"
    >
      <template v-if="!isFeedbackSubmitted">
        <component :is="Modal.Header">
          <component :is="Modal.Title">{{ title }}</component>
          <component :is="Modal.Description">
            {{ description }}
          </component>
        </component>

        <FeedbackForm
          :submit-label="submitLabel"
          :with-topics="withTopics"
          :topics="topics"
          @after-submit="handleAfterSubmit"
        />
      </template>

      <template v-else>
        <FeedbackStatus
          v-if="isFeedbackSubmitted"
          :status="submissionStatus.status"
          :message="submissionStatus.message"
        />
      </template>

      <DrawerFooter v-if="!isDesktop" class="pt-2">
        <DrawerClose as-child>
          <Button variant="outline"> Close </Button>
        </DrawerClose>
      </DrawerFooter>
    </component>
  </component>
</template>
