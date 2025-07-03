<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="flex flex-col items-center justify-center gap-8 md:col-span-3">
      <h2 class="text-3xl max-w-4/5 text-neutral-700 font-semibold text-center">
        We are a company that values your feedback.
      </h2>

      <FeedbackWidget
        trigger-label="Share Generic Feedback"
        trigger-class="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 shadow-none"
        :with-topics="false"
      />
    </div>
  </div>
</template>
