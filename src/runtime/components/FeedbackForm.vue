<script lang="ts" setup>
import { useRoute } from "#app";
import { ref } from "vue";

const route = useRoute();

const feedbackOption = ref("");
const feedbackMessage = ref("");
const validationErrorMessage = ref("");

const resetErrorMessage = () => (validationErrorMessage.value = "");

const submitFeedback = async () => {
  if (!feedbackOption.value) {
    validationErrorMessage.value = "Please select a feedback option.";
    return;
  }

  const feedbackData = {
    route: {
      fullPath: route.fullPath,
      hash: route.hash,
      query: route.query,
      name: route.name,
      path: route.path,
      redirectedFrom: route.redirectedFrom,
    },
    time: {
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    option: feedbackOption.value,
    message: feedbackMessage.value,
  };

  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Feedback submitted successfully:", res);

    feedbackOption.value = "";
    feedbackMessage.value = "";
  } catch (error) {
    console.error("Error submitting feedback:", error);
  }
};
</script>

<template>
  <form @submit.prevent="submitFeedback" @change="resetErrorMessage">
    <h3>Feedback</h3>
    <div id="feedback-options">
      <label for="sad">
        <input
          id="sad"
          v-model="feedbackOption"
          class="sr-only"
          type="radio"
          name="feedback-option"
          value="Sad"
        />
        <span>😟</span>
      </label>
      <label for="neutral">
        <input
          id="neutral"
          v-model="feedbackOption"
          class="sr-only"
          type="radio"
          name="feedback-option"
          value="Neutral"
        />
        <span>😐</span>
      </label>
      <label for="happy">
        <input
          id="happy"
          v-model="feedbackOption"
          class="sr-only"
          type="radio"
          name="feedback-option"
          value="Happy"
        />
        <span>😃</span>
      </label>
    </div>

    <p v-if="validationErrorMessage" id="validation-error-message">
      {{ validationErrorMessage }}
    </p>

    <textarea
      id="message"
      v-model="feedbackMessage"
      name="message"
      placeholder="Optional Message..."
    />

    <button>Submit</button>
  </form>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

#feedback-options {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  border: 1px solid #ddd;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
}

label > span {
  font-size: 1.5rem;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
}

input[type="radio"]:checked ~ span {
  background-color: #bada55;
}

#validation-error-message {
  color: red;
  font-size: 0.75rem;
  margin-bottom: 1rem;
}

textarea {
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  width: 100%;
  padding: 0.5rem;
  height: 5rem;
}

button {
  background-color: #bada55;
  color: #000;
  border: none;
  margin-top: 1rem;
  border-radius: 0.25rem;
  width: 100%;
  padding: 0.25rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
