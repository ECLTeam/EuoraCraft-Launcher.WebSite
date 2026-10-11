<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import HomeFeatureStories from '~/components/home/HomeFeatureStories.vue'
import HomeOpenSource from '~/components/home/HomeOpenSource.vue'
import HomeDownloadCta from '~/components/home/HomeDownloadCta.vue'
import { HOME_STAGES } from '~/data/homeStages'

const { t } = useI18n()
const container = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const moving = ref(false)
const showControls = ref(true)
let pendingFocus = false
let wheelTimer: ReturnType<typeof setTimeout> | undefined
let wheelMode: 'reading' | 'paging' | undefined
let wheelDistance = 0
let wheelUsed = false

function currentReader() {
  return container.value!.querySelectorAll<HTMLElement>('.home-stage-content')[activeIndex.value]!
}

function stages() {
  return container.value!.querySelectorAll<HTMLElement>('.home-stage')
}

function stageTop(index: number) {
  return stages()[index]!.getBoundingClientRect().top + window.scrollY
}

function updateViewport() {
  showControls.value = window.scrollY <= stageTop(HOME_STAGES.length - 1) + 1
}

function canRead(reader: HTMLElement, direction: number) {
  return direction > 0
    ? reader.scrollTop + reader.clientHeight < reader.scrollHeight - 1
    : reader.scrollTop > 1
}

function navigate(index: number) {
  if (moving.value || index === activeIndex.value || index < 0 || index >= HOME_STAGES.length) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  moving.value = true
  pendingFocus = true
  window.scrollTo({ top: stageTop(index), behavior: reducedMotion ? 'instant' : 'smooth' })
  if (reducedMotion) finishNavigation()
}

function finishNavigation() {
  updateViewport()
  if (!showControls.value) {
    moving.value = false
    pendingFocus = false
    return
  }
  const index = Math.max(0, Math.min(HOME_STAGES.length - 1, Math.round((window.scrollY - stageTop(0)) / stages()[0]!.clientHeight)))
  const destination = stageTop(index)
  if (Math.abs(window.scrollY - destination) > 1) {
    moving.value = true
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: destination, behavior: reducedMotion ? 'instant' : 'smooth' })
    if (reducedMotion) finishNavigation()
    return
  }
  activeIndex.value = index
  moving.value = false
  if (pendingFocus) {
    stages()[activeIndex.value]?.focus({ preventScroll: true })
    pendingFocus = false
  }
}

function onWheel(event: WheelEvent) {
  if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return
  const reader = currentReader()
  const delta = event.deltaY * (event.deltaMode === 1 ? 24 : event.deltaMode === 2 ? reader.clientHeight : 1)
  const destination = activeIndex.value + Math.sign(delta)
  if (!moving.value && !wheelMode && !canRead(reader, delta) && (destination < 0 || destination >= HOME_STAGES.length)) return
  event.preventDefault()
  wheelMode ??= canRead(reader, delta) ? 'reading' : 'paging'
  clearTimeout(wheelTimer)
  wheelTimer = setTimeout(() => {
    wheelMode = undefined
    wheelDistance = 0
    wheelUsed = false
  }, 180)
  if (moving.value) {
    wheelUsed = true
    return
  }
  if (wheelMode === 'reading') {
    reader.scrollTop += delta
    return
  }
  if (wheelUsed) return
  wheelDistance += delta
  if (Math.abs(wheelDistance) < 32) return
  wheelUsed = true
  navigate(activeIndex.value + Math.sign(wheelDistance))
}

function onKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return
  const target = event.target as HTMLElement
  if (target.closest('input, textarea, select, [contenteditable="true"]')) return
  const direction = ['ArrowDown', 'PageDown'].includes(event.key) || (event.key === ' ' && !event.shiftKey)
    ? 1
    : ['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey) ? -1 : 0
  if (!direction) return
  const reader = currentReader()
  const destination = activeIndex.value + direction
  if (!moving.value && !canRead(reader, direction) && (destination < 0 || destination >= HOME_STAGES.length)) return
  event.preventDefault()
  if (moving.value) return
  if (canRead(reader, direction)) {
    reader.scrollTop += direction * (event.key.startsWith('Arrow') ? 80 : reader.clientHeight * 0.9)
    return
  }
  navigate(destination)
}

function onResize() {
  if (showControls.value && !moving.value) {
    window.scrollTo({ top: stageTop(activeIndex.value), behavior: 'instant' })
  }
  updateViewport()
}

onMounted(() => {
  updateViewport()
  document.addEventListener('scroll', updateViewport, { passive: true })
  document.addEventListener('scrollend', finishNavigation)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  clearTimeout(wheelTimer)
  document.removeEventListener('scroll', updateViewport)
  document.removeEventListener('scrollend', finishNavigation)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div
    class="home-layout"
  >
    <div
      ref="container"
      class="home-page"
      tabindex="0"
      role="region"
      :aria-label="t('home.stages.navigation')"
      @wheel="onWheel"
      @keydown="onKeydown"
    >
      <HomeHero />
      <HomeFeatureStories />
    </div>
    <HomeStageNavigation
      v-if="showControls"
      :index="activeIndex"
      :moving="moving"
      @navigate="navigate"
    />
    <HomeOpenSource />
    <HomeDownloadCta />
  </div>
</template>

<style scoped>
.home-page {
  position: relative;
}
.home-page:focus {
  outline: none;
}
.home-page :deep(.home-stage) {
  position: relative;
  height: 100dvh;
  overflow: hidden;
}
.home-page :deep(.home-stage:focus) {
  outline: none;
}
.home-page :deep(.home-stage-content) {
  display: flex;
  flex-direction: column;
  height: calc(100% - 104px);
  padding-block: calc(var(--site-header-height) + var(--site-header-inset) + 28px) 24px;
  overflow-y: auto;
  scrollbar-width: thin;
}
@media print {
  .home-page,
  .home-page :deep(.home-stage),
  .home-page :deep(.home-stage-content) {
    height: auto;
    overflow: visible;
  }
  .home-layout :deep(.stage-navigation) {
    display: none;
  }
}
</style>
