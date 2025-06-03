<script setup lang="ts">
const { openWidget } = useFeedbackWidget();
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center">
    <div
      class="w-5/6 h-5/6 grid grid-rows-2 md:grid-rows-1 md:grid-cols-5 gap-8 *:border-[0.5px] *:border-neutral-200 *:bg-neutral-50 *:p-10 *:rounded-2xl"
    >
      <div
        class="flex flex-col items-center justify-center gap-8 md:col-span-3"
      >
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
      <div class="flex items-center justify-center relative md:col-span-2">
        <h2
          class="text-xl max-w-4/5 text-neutral-700 font-semibold text-center"
        >
          Help Us Improve By Sharing Your Feedback.
        </h2>

        <button
          class="cursor-pointer absolute bottom-2 right-2 rounded-xl size-12 text-xl inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
          @click="openWidget"
        >
          😊
        </button>
      </div>
    </div>
  </div>
</template>
