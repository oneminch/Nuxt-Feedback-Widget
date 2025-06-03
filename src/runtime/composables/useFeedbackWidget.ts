import { useState } from "#imports";

const useFeedbackWidget = () => {
  const isOpen = useState("feedback-widget-state", () => false);

  const closeWidget = () => (isOpen.value = false);
  const openWidget = () => (isOpen.value = true);

  return { isOpen, closeWidget, openWidget };
};

export default useFeedbackWidget;
