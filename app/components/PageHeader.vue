<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="border-b border-(--ui-border)">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div v-reveal>
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
          {{ title }}
        </h1>
        <p
          v-if="description"
          class="mt-3 max-w-2xl text-muted"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
