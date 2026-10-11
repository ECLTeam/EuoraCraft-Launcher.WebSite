<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'classic' | 'folia' | 'subtle'
    interactive?: boolean
  }>(),
  { variant: 'classic', interactive: false }
)
</script>

<template>
  <div
    class="ecl-surface"
    :class="[
      `ecl-surface--${variant}`,
      { 'ecl-surface--interactive': interactive }
    ]"
  >
    <slot />
  </div>
</template>
