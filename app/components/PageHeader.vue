<script setup lang="ts">
defineProps<{ title: string, description?: string, badge?: string }>()
</script>

<template>
  <div class="page-header site-container">
    <div
      v-reveal
      class="page-header-copy"
    >
      <span
        v-if="badge"
        class="eyebrow"
      >{{ badge }}</span>
      <h1>{{ title }}</h1>
      <p
        v-if="description"
        class="section-description"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  padding-block: clamp(48px, 6vw, 72px) 8px;
}
.page-header-copy {
  max-width: 720px;
}
h1 {
  margin: 0;
  font-size: clamp(30px, 3.8vw, 44px);
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
  text-wrap: balance;
}
</style>
