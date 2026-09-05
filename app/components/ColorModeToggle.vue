<script setup lang="ts">
import { nextTick } from 'vue'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  const next = colorMode.value === 'light' ? 'dark' : 'light'
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const apply = async () => {
    colorMode.preference = next
    await nextTick()
  }
  if (!prefersReduced && 'startViewTransition' in document) {
    document.startViewTransition(apply)
  } else {
    apply()
  }
}
</script>

<template>
  <UButton
    :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
    square
    variant="ghost"
    color="neutral"
    :aria-label="isDark ? '切换到亮色主题' : '切换到暗色主题'"
    class="transition-transform duration-300 ease-standard hover:rotate-12"
    @click="toggle"
  />
</template>
