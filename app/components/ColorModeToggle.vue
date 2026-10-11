<script setup lang="ts">
import { nextTick } from 'vue'

const colorMode = useColorMode()
const { t } = useI18n()
const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  const next = colorMode.value === 'light' ? 'dark' : 'light'
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
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
    :icon="
      colorMode.unknown
        ? 'i-lucide-sun-moon'
        : isDark
          ? 'i-lucide-sun'
          : 'i-lucide-moon'
    "
    square
    variant="ghost"
    color="neutral"
    :aria-label="
      colorMode.unknown
        ? t('a11y.theme')
        : t(isDark ? 'a11y.light' : 'a11y.dark')
    "
    class="transition-transform duration-300 ease-standard hover:rotate-12"
    @click="toggle"
  />
</template>
