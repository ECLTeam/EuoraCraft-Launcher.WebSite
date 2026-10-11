<script setup lang="ts">
import { BRAND } from '~/constants'

const { t } = useI18n()
const config = useRuntimeConfig()
const showcaseUrl = computed(() => String(config.public.showcaseUrl ?? ''))
const DESIGN_WIDTH = 1280
const DESIGN_HEIGHT = 800
const frame = ref<HTMLElement | null>(null)
const containerWidth = ref(DESIGN_WIDTH)
const scale = computed(() =>
  Math.max(0.1, Math.min(1, containerWidth.value / DESIGN_WIDTH))
)
let observer: ResizeObserver | undefined
onMounted(() => {
  const el = frame.value
  if (!el) return
  containerWidth.value = el.clientWidth
  observer = new ResizeObserver(() => {
    containerWidth.value = el.clientWidth
  })
  observer.observe(el)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div>
    <template v-if="showcaseUrl">
      <EclSurface class="showcase-window">
        <div class="showcase-toolbar">
          <UIcon
            name="i-lucide-app-window"
            class="size-4 ecl-link"
          /><span>{{ BRAND.name }} · {{ t("nav.showcase") }}</span><UButton
            :href="showcaseUrl"
            target="_blank"
            color="neutral"
            variant="ghost"
            icon="i-lucide-external-link"
            :aria-label="t('showcase.launch')"
            :label="t('showcase.launch')"
          />
        </div>
        <div
          ref="frame"
          class="showcase-frame"
        >
          <iframe
            :src="showcaseUrl"
            :title="t('showcase.title')"
            :width="DESIGN_WIDTH"
            :height="DESIGN_HEIGHT"
            :style="{ transform: `scale(${scale})` }"
            allow="clipboard-write; fullscreen"
          />
        </div>
      </EclSurface>
      <p class="mt-4 text-sm leading-7 text-muted">
        {{ t("showcase.note") }}
      </p>
    </template>
    <EclSurface
      v-else
      class="p-12 text-center"
    >
      <UIcon
        name="i-lucide-app-window"
        class="size-12 ecl-link"
      />
      <h2 class="mt-4 font-semibold">
        {{ t("showcase.unconfigured.title") }}
      </h2>
      <p class="mt-2 text-sm text-muted">
        {{ t("showcase.unconfigured.desc") }}
      </p>
    </EclSurface>
  </div>
</template>

<style scoped>
.showcase-window {
  max-width: 1280px;
  margin-inline: auto;
  overflow: hidden;
  border-radius: 12px;
}
.showcase-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--ecl-border);
}
.showcase-toolbar > span {
  flex: 1;
  font-size: 12px;
}
.showcase-toolbar a {
  min-height: 44px;
}
.showcase-frame {
  width: 100%;
  aspect-ratio: 1280 / 800;
  overflow: hidden;
}
.showcase-frame iframe {
  display: block;
  transform-origin: top left;
  border: 0;
}
@media (max-width: 480px) {
  .showcase-toolbar > span {
    font-size: 10px;
  }
  .showcase-toolbar a {
    font-size: 10px;
  }
}
</style>
