import type { Ref } from "#imports";
import type {
  LocationQuery,
  RouteRecordNameGeneric,
  RouteLocationGeneric,
} from "vue-router";

export interface FeedbackUIProps {
  title?: string;
  description?: string;
  triggerLabel?: string;
  triggerClass?: string;
  submitLabel?: string;
  withTopics?: boolean;
  topics?: string[];
}

export interface FeedbackData {
  topic: string;
  option: string;
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
  closeWidget: () => boolean;
  openWidget: () => boolean;
}
