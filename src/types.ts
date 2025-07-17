import type { Ref } from "#imports";
import type {
  LocationQuery,
  RouteRecordNameGeneric,
  RouteLocationGeneric,
} from "vue-router";
import type { defaultReactions } from "./runtime/lib/defaults";

export interface FeedbackUIProps {
  title?: string;
  description?: string;
  triggerLabel?: string;
  triggerClass?: string;
  submitLabel?: string;
  withTopics?: boolean;
  topics?: string[];
}

export type FeedbackOption = (typeof defaultReactions)[number];

export type FeedbackFormState = Pick<
  FeedbackData,
  "topic" | "reaction" | "message"
>;

export interface FeedbackData {
  topic: string;
  reaction: string;
  message: string;
  metadata: {
    route: {
      fullPath: string;
      hash: string;
      query: LocationQuery;
      name: RouteRecordNameGeneric;
      path: string;
      redirectedFrom: RouteLocationGeneric | undefined;
    };
    time: {
      timestamp: string;
      timezone: string;
    };
  };
}

export interface UseFeedbackWidget {
  isOpen: Ref<boolean, boolean>;
  closeWidget: () => void;
  openWidget: () => void;
  isWidgetMounted: Readonly<Ref<boolean, boolean>>;
  registerWidget: () => void;
  unregisterWidget: () => void;
}

export type SubmissionStatus = "success" | "failure";
