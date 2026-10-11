<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string
    darkSrc?: string
    alt: string
    width?: number
    height?: number
    eager?: boolean
  }>(),
  {
    src: '/marketing/launcher-overview.png',
    width: 1280,
    height: 800,
    eager: false
  }
)
</script>

<template>
  <div
    class="launcher-window"
    :style="{ aspectRatio: `${width} / ${height}` }"
  >
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      format="webp"
      sizes="320px sm:720px lg:820px"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      :class="{ 'launcher-light': darkSrc }"
    />
    <NuxtImg
      v-if="darkSrc"
      :src="darkSrc"
      :alt="alt"
      :width="width"
      :height="height"
      format="webp"
      sizes="320px sm:720px lg:820px"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      class="launcher-dark"
    />
  </div>
</template>

<style scoped>
.launcher-window {
  position: relative;
  overflow: hidden;
  width: 100%;
  border: 1px solid var(--ecl-border-strong);
  border-radius: 12px;
  background: var(--ecl-surface);
  box-shadow: var(--ecl-shadow-pop);
}
.launcher-window img {
  display: block;
  width: 100%;
  height: auto;
}
.launcher-window .launcher-dark {
  display: none;
}
:global(.dark .launcher-window .launcher-light) {
  display: none;
}
:global(.dark .launcher-window .launcher-dark) {
  display: block;
}
</style>
