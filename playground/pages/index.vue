<template>
  <div class="absolute inset-0 flex items-center justify-center">
    <div
      class="w-2/3 h-4/5 grid grid-cols-5 gap-8 *:border-[0.5px] *:border-neutral-200 *:bg-neutral-50 *:p-10 *:rounded-2xl"
    >
      <div class="flex flex-col items-center justify-center gap-8 col-span-3">
        <h2
          class="text-3xl max-w-4/5 text-neutral-700 font-semibold text-center"
        >
          Help Us Improve By Sharing Your Feedback.
        </h2>
        <FeedbackWidget
          title="Share Your Feedback"
          description="What do you think?"
          trigger-label="Share Feedback 😊"
          trigger-class="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 shadow-none"
        />
      </div>
      <div class="flex items-center justify-center relative col-span-2">
        <h2
          class="text-xl max-w-4/5 text-neutral-700 font-semibold text-center"
        >
          Help Us Improve By Sharing Your Feedback.
        </h2>
        <FeedbackWidget
          trigger-class="absolute bottom-2 right-2 rounded-xl size-12 text-xl"
        />
      </div>
    </div>
  </div>
</template>
