<script setup lang="ts">
import { SHOWCASE_URL } from '~/constants'

const { t } = useI18n()

// 启动器前端按桌面窗口尺寸设计，以固定设计宽高 + transform 缩放适配容器宽度
const DESIGN_WIDTH = 1280
const DESIGN_HEIGHT = 800

const frame = ref<HTMLElement | null>(null)
const containerWidth = ref(0)

const scale = computed(() => {
  const avail = containerWidth.value || DESIGN_WIDTH
  return Math.min(1, (avail - 48) / DESIGN_WIDTH)
})

const frameHeight = computed(() => DESIGN_HEIGHT * scale.value)

onMounted(() => {
  const el = frame.value
  if (!el) return
  containerWidth.value = el.clientWidth
  const observer = new ResizeObserver(() => {
    containerWidth.value = el.clientWidth
  })
  observer.observe(el)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <div
    ref="frame"
    class="w-full"
  >
    <template v-if="SHOWCASE_URL">
      <div class="overflow-hidden rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 shadow-2xl backdrop-blur">
        <div class="flex items-center gap-3 border-b border-(--ui-border) px-4 py-2.5">
          <div class="flex gap-1.5">
            <span class="size-3 rounded-full bg-red-400/90" />
            <span class="size-3 rounded-full bg-yellow-400/90" />
            <span class="size-3 rounded-full bg-green-400/90" />
          </div>
          <div class="flex min-w-0 flex-1 items-center gap-2 text-xs text-muted">
            <UIcon
              name="i-lucide-lock"
              class="size-3.5 shrink-0 text-(--ui-primary)"
            />
            <span class="truncate">{{ SHOWCASE_URL }}</span>
          </div>
          <UButton
            :href="SHOWCASE_URL"
            target="_blank"
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-lucide-external-link"
            :aria-label="t('showcase.launch')"
          />
        </div>

        <div
          class="overflow-hidden"
          :style="{ height: `${frameHeight}px` }"
        >
          <iframe
            :src="SHOWCASE_URL"
            title="EuoraCraft Launcher"
            :width="DESIGN_WIDTH"
            :height="DESIGN_HEIGHT"
            class="origin-top-left border-0"
            :style="{ transform: `scale(${scale})` }"
            allow="clipboard-write; fullscreen"
          />
        </div>
      </div>
      <p class="mt-3 text-xs text-muted">
        {{ t('showcase.note') }}
      </p>
    </template>

    <div
      v-else
      class="card-outline flex flex-col items-center rounded-2xl border border-dashed border-(--ui-border) bg-(--ui-bg)/60 p-16 text-center"
    >
      <UIcon
        name="i-lucide-app-window"
        class="size-12 text-(--ui-primary)"
      />
      <h3 class="mt-4 font-semibold">
        {{ t('showcase.unconfigured.title') }}
      </h3>
      <p class="mt-2 max-w-md text-sm text-muted">
        {{ t('showcase.unconfigured.desc') }}
      </p>
    </div>
  </div>
</template>
