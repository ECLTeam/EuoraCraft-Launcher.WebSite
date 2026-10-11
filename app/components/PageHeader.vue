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
  position: relative;
  padding-block: 72px 32px;
}
.page-header::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 -10%;
  width: 70%;
  z-index: -1;
  background: radial-gradient(ellipse, var(--aurora-c1), transparent 70%);
  pointer-events: none;
}
.page-header-copy {
  max-width: 720px;
}
h1 {
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.25;
  font-weight: 650;
  letter-spacing: -0.035em;
}
</style>
