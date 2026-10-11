<script setup lang="ts">
import { HOME_STAGES } from '~/data/homeStages'

const props = defineProps<{ index: number, moving: boolean }>()
const emit = defineEmits<{ navigate: [index: number] }>()
const { t } = useI18n()
const previous = computed(() => HOME_STAGES[props.index - 1])
const next = computed(() => HOME_STAGES[props.index + 1])
</script>

<template>
  <nav
    class="stage-navigation"
    :aria-label="t('home.stages.navigation')"
  >
    <a
      v-if="previous"
      :href="`#${previous}`"
      class="stage-arrow"
      :aria-label="t('home.stages.previous')"
      :aria-disabled="moving || undefined"
      @click.prevent="emit('navigate', index - 1)"
    >
      <UIcon
        name="i-lucide-chevron-up"
        class="size-5"
      />
    </a>
    <span
      v-if="index > 0"
      class="stage-position"
      :aria-label="t('home.stages.position', { current: index + 1, total: HOME_STAGES.length })"
    >
      {{ String(index + 1).padStart(2, '0') }} / {{ String(HOME_STAGES.length).padStart(2, '0') }}
    </span>
    <a
      v-if="next"
      :href="`#${next}`"
      class="stage-arrow"
      :aria-label="t(index === 0 ? 'home.hero.scroll' : 'home.stages.next')"
      :aria-disabled="moving || undefined"
      @click.prevent="emit('navigate', index + 1)"
    >
      <UIcon
        name="i-lucide-chevron-down"
        class="size-5"
      />
    </a>
  </nav>
</template>

<style scoped>
.stage-navigation {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
}
.stage-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--ecl-border);
  border-radius: 50%;
  color: var(--ecl-text-secondary);
  background: var(--ecl-glass);
  transition: color 180ms var(--ease-standard), background-color 180ms var(--ease-standard);
}
.stage-arrow:hover {
  color: var(--ecl-text);
  background: var(--ecl-hover);
}
.stage-arrow[aria-disabled="true"] {
  cursor: default;
  opacity: 0.55;
}
.stage-position {
  color: var(--ecl-text-tertiary);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
</style>
