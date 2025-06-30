<script setup lang="ts">
const toggleColorMode = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
};
</script>

<template>
  <div class="w-5/6 h-full absolute inset-0 mx-auto flex flex-col">
    <header>
      <hgroup class="flex items-center gap-6 p-4">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
      </hgroup>

      <button class="absolute top-4 right-0" @click="toggleColorMode">
        🌓
      </button>
    </header>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
