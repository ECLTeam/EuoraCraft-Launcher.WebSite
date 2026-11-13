<script setup lang="ts">
import { BRAND, LINKS } from '~/constants'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocale = useLocaleSwitch()
const route = useRoute()
const mobileOpen = ref(false)
const languages = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]
const languageUi = {
  base: 'h-9 ps-2.5 pe-7 bg-transparent text-sm font-normal text-(--ecl-text-secondary) hover:bg-(--ecl-hover) data-[state=open]:bg-transparent data-[state=open]:text-(--ecl-text) focus-visible:outline-2 focus-visible:outline-(--ecl-link) focus-visible:outline-offset-2 max-[1023px]:h-11',
  trailing: 'pe-2',
  trailingIcon: 'size-3.5 transition-transform group-data-[state=open]:rotate-180',
  content: 'language-menu z-60 min-w-32 rounded-(--ecl-radius-control) border border-(--ecl-border) bg-(--ecl-menu) ring-0 shadow-(--ecl-shadow-pop)',
  group: 'p-1',
  item: 'min-h-9 items-center rounded-sm px-2.5 text-sm text-(--ecl-text) before:hidden data-highlighted:bg-(--ecl-hover) data-highlighted:text-(--ecl-text) max-[1023px]:min-h-11',
  itemTrailingIcon: 'size-4 text-(--ecl-text-secondary)'
}
const links = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.features'), to: localePath('/features') },
  { label: t('nav.showcase'), to: localePath('/showcase') },
  { label: t('nav.docs'), to: localePath('/docs') },
  { label: t('nav.about'), to: localePath('/about') }
])
// 静态托管会在目录页补尾斜杠，比较前统一去掉
const normalize = (path: string) => path.replace(/\/+$/, '') || '/'
const isActive = (to: string) => normalize(route.path) === normalize(to)

/* 桌面导航滑动指示器：悬停跟随（充能动画），移开后滑回激活项 */
const desktopNav = ref<HTMLElement | null>(null)
const indicator = reactive({ x: 0, w: 0, ready: false, key: 0 })
let lastTarget: Element | null = null
function updateIndicator(forceCharge = false) {
  const nav = desktopNav.value
  // 目标优先取鼠标悬停的链接，否则回到当前激活项
  const el = nav?.querySelector<HTMLElement>('.nav-link:hover')
    ?? nav?.querySelector<HTMLElement>('.nav-link.active')
  // 激活项不存在或导航不可见（窄屏 display:none）时隐藏指示器
  if (!nav || !el || nav.clientWidth === 0) {
    indicator.ready = false
    lastTarget = null
    return
  }
  // 目标变化或强制时递增 key，重放内侧的充能动画
  if (forceCharge || el !== lastTarget) {
    indicator.key++
    lastTarget = el
  }
  indicator.x = el.offsetLeft
  indicator.w = el.offsetWidth
  indicator.ready = true
}
let navObserver: ResizeObserver | undefined
onMounted(() => {
  updateIndicator()
  navObserver = new ResizeObserver(() => updateIndicator())
  if (desktopNav.value) navObserver.observe(desktopNav.value)
})
onBeforeUnmount(() => navObserver?.disconnect())
watch(locale, () => nextTick(updateIndicator))
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
    nextTick(updateIndicator)
  }
)
const menuButton = ref<HTMLButtonElement | null>(null)
function closeMenu() {
  mobileOpen.value = false
  menuButton.value?.focus()
}
</script>

<template>
  <header
    class="site-header"
    @keydown.esc="closeMenu"
  >
    <div class="nav-bar">
      <NuxtLink
        :to="localePath('/')"
        class="nav-brand"
        :aria-label="BRAND.name"
      >
        <img
          src="/favicon.ico"
          alt=""
          width="28"
          height="28"
        >
        <span class="brand-full">{{ BRAND.name }}</span>
        <span class="brand-short">{{ BRAND.shortName }}</span>
      </NuxtLink>
      <nav
        ref="desktopNav"
        class="desktop-nav"
        :aria-label="t('footer.nav')"
        @mouseover="updateIndicator(true)"
        @mouseleave="updateIndicator()"
      >
        <span
          v-if="indicator.ready"
          class="nav-indicator"
          :style="{ transform: `translateX(${indicator.x}px)`, width: `${indicator.w}px` }"
          aria-hidden="true"
        >
          <span
            :key="indicator.key"
            class="nav-indicator-fill"
          />
        </span>
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: isActive(link.to) }"
          :aria-current="isActive(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="nav-controls">
        <ColorModeToggle class="nav-utility" />
        <USelect
          :model-value="locale"
          :items="languages"
          variant="ghost"
          color="neutral"
          size="sm"
          class="language-select w-22 shrink-0 max-[480px]:w-20"
          :ui="languageUi"
          :content="{ position: 'popper', align: 'end', sideOffset: 6, bodyLock: false }"
          :aria-label="t('a11y.language')"
          @update:model-value="switchLocale"
        />
        <UButton
          :to="LINKS.repo"
          target="_blank"
          icon="i-simple-icons-github"
          :aria-label="t('home.opensource.github')"
          color="neutral"
          variant="ghost"
          class="nav-github"
        />
        <UButton
          :to="localePath('/download')"
          color="primary"
          variant="outline"
          icon="i-lucide-download"
          :ui="{ leadingIcon: 'size-4 min-[481px]:hidden' }"
          :label="t('nav.download')"
          :aria-label="t('nav.download')"
          class="nav-download"
        />
        <button
          ref="menuButton"
          type="button"
          class="menu-button"
          :aria-label="t(mobileOpen ? 'a11y.closeMenu' : 'a11y.openMenu')"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-navigation"
          @click="mobileOpen = !mobileOpen"
        >
          <UIcon
            :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            class="size-5"
          />
        </button>
      </div>
    </div>
    <Transition name="menu">
      <nav
        v-if="mobileOpen"
        id="mobile-navigation"
        class="mobile-nav"
        :aria-label="t('footer.nav')"
      >
        <NuxtLink
          v-for="link in [
            ...links,
            { label: t('nav.download'), to: localePath('/download') }
          ]"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: isActive(link.to) }"
          :aria-current="isActive(link.to) ? 'page' : undefined"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
/* 通栏吸顶导航：一条底部分隔线承担分层，不做悬浮胶囊 */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--ecl-border);
  background: var(--ecl-header-bg);
  backdrop-filter: blur(10px);
}
.nav-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  width: min(100% - 48px, 1200px);
  height: var(--site-header-height);
  margin-inline: auto;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  flex-shrink: 0;
}
.nav-brand img {
  border-radius: 6px;
}
.brand-short {
  display: none;
}
.desktop-nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
}
/* 滑动指示器：外层负责定位与滑动，内层负责充能动画 */
.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  transition:
    transform 260ms var(--ease-emphasized),
    width 260ms var(--ease-emphasized);
  will-change: transform, width;
}
.nav-indicator-fill {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--ecl-primary);
  box-shadow: 0 0 8px var(--ecl-glow);
  transform-origin: left center;
  animation: nav-charge 360ms var(--ease-emphasized);
}
@keyframes nav-charge {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 6px 10px;
  color: var(--ecl-text-secondary);
  font-size: 14px;
  white-space: nowrap;
  border-radius: var(--ecl-radius-control);
  transition: color 150ms var(--ease-standard), background-color 150ms var(--ease-standard);
}
.nav-link:hover {
  color: var(--ecl-text);
}
.nav-link.active {
  color: var(--ecl-text);
  font-weight: 500;
}
.nav-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}
.nav-controls :deep(button),
.nav-controls :deep(a) {
  min-height: 36px;
  min-width: 36px;
  justify-content: center;
}
.nav-controls :deep(.nav-utility) {
  color: var(--ecl-text-secondary);
}
.nav-download {
  margin-left: 8px;
  padding-inline: 14px;
  font-size: 14px;
  font-weight: 500;
}
.nav-github {
  color: var(--ecl-text-secondary);
}
.menu-button {
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: var(--ecl-radius-control);
}
.menu-button:hover {
  background: var(--ecl-hover);
}
/* 移动端菜单：从导航栏下缘展开的通栏面板 */
.mobile-nav {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 8px 16px 12px;
  border-bottom: 1px solid var(--ecl-border);
  background: var(--ecl-menu);
  box-shadow: var(--ecl-shadow-pop);
}
.mobile-nav .nav-link {
  min-height: 44px;
  border-radius: 6px;
}
.mobile-nav .nav-link:hover,
.mobile-nav .nav-link.active {
  background: var(--ecl-hover);
}
@media (max-width: 1150px) {
  .brand-full {
    display: none;
  }
  .brand-short {
    display: inline;
  }
  .nav-bar {
    gap: 16px;
  }
}
@media (max-width: 1023px) {
  .desktop-nav,
  .nav-github {
    display: none;
  }
  .menu-button {
    display: flex;
  }
  .nav-bar {
    gap: 8px;
  }
  .nav-controls :deep(button),
  .nav-controls :deep(a) {
    min-height: 44px;
    min-width: 44px;
  }
  .nav-download {
    font-size: 12px;
  }
}
@media (max-width: 767px) {
  .nav-bar {
    width: calc(100% - 32px);
  }
}
@media (max-width: 480px) {
  .nav-bar {
    gap: 6px;
  }
  .nav-download :deep(.truncate) {
    display: none;
  }
  .nav-download {
    margin-left: 2px;
    padding-inline: 10px;
  }
  .nav-controls {
    gap: 0;
  }
}
</style>
