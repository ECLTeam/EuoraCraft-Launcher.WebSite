<script setup lang="ts">
import { BRAND, LINKS } from '~/constants'

const { t, locale } = useI18n()
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
  content: 'language-menu z-60 min-w-32 rounded-md border border-(--ecl-border) bg-(--ecl-menu) ring-0 shadow-(--ecl-shadow-pop)',
  group: 'p-1',
  item: 'min-h-9 items-center rounded-sm px-2.5 text-sm text-(--ecl-text) before:hidden data-highlighted:bg-(--ecl-hover) data-highlighted:text-(--ecl-text) max-[1023px]:min-h-11',
  itemTrailingIcon: 'size-4 text-(--ecl-text-secondary)'
}
const links = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.features'), to: '/features' },
  { label: t('nav.showcase'), to: '/showcase' },
  { label: t('nav.docs'), to: '/docs' },
  { label: t('nav.about'), to: '/about' }
])
const isActive = (to: string) => route.path === to
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
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
    <div class="floating-nav">
      <NuxtLink
        to="/"
        class="nav-brand"
        :aria-label="BRAND.name"
      >
        <img
          src="/favicon.ico"
          alt=""
          width="30"
          height="30"
        >
        <span class="brand-full">{{ BRAND.name }}</span>
        <span class="brand-short">{{ BRAND.shortName }}</span>
      </NuxtLink>
      <nav
        class="desktop-nav"
        :aria-label="t('footer.nav')"
      >
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
          v-model="locale"
          :items="languages"
          variant="ghost"
          color="neutral"
          size="sm"
          class="language-select w-22 shrink-0 max-[480px]:w-20"
          :ui="languageUi"
          :content="{ position: 'popper', align: 'end', sideOffset: 6, bodyLock: false }"
          :aria-label="t('a11y.language')"
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
          to="/download"
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
              { label: t('nav.download'), to: '/download' }
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
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: var(--site-header-inset);
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  margin: 0;
  width: min(100% - 22px, 1226px);
}
.floating-nav {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: var(--site-header-height);
  padding: 5px 12px;
  border: 1px solid var(--ecl-border);
  border-radius: 12px;
  background: var(--ecl-glass-sidebar);
  box-shadow: var(--ecl-shadow-surface), var(--ecl-glass-highlight);
  backdrop-filter: blur(18px) saturate(1.35);
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  font-weight: 650;
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
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 10px 12px;
  color: var(--ecl-text-secondary);
  font-size: 14px;
  white-space: nowrap;
  transition: color 180ms var(--ease-emphasized);
}
.nav-link:hover {
  color: var(--ecl-text);
}
.nav-link.active {
  color: var(--ecl-text);
}
.desktop-nav .nav-link.active::after {
  content: '';
  position: absolute;
  right: 12px;
  bottom: 4px;
  left: 12px;
  height: 2px;
  background: var(--ecl-primary);
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
  padding-inline: 16px;
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
  border-radius: 6px;
}
.menu-button:hover {
  background: var(--ecl-hover);
}
.mobile-nav {
  position: absolute;
  inset: calc(100% + 8px) 0 auto;
  padding: 8px;
  border: 1px solid var(--ecl-border);
  border-radius: 6px;
  background: var(--ecl-menu);
  box-shadow: var(--ecl-shadow-pop);
}
.mobile-nav .nav-link {
  min-height: 44px;
  border-radius: 4px;
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
  .floating-nav {
    gap: 20px;
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
  .floating-nav {
    gap: 8px;
    padding-inline: 8px;
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
  .site-header { width: calc(100% - 16px); }
  .floating-nav { padding-inline: 7px; }
}
@media (max-width: 480px) {
  .floating-nav { gap: 6px; }
  .nav-download :deep(.truncate) { display: none; }
  .nav-download { margin-left: 2px; padding-inline: 10px; }
  .nav-controls { gap: 0; }
}
</style>
