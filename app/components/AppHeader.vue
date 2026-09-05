<script setup lang="ts">
import { BRAND, LINKS } from '~/constants'

const { t, locale } = useI18n()

const links = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.features'), to: '/features' },
  { label: t('nav.download'), to: '/download' },
  { label: t('nav.docs'), to: '/docs' },
  { label: t('nav.about'), to: '/about' }
])

const langItems = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

const route = useRoute()
const isActive = (to: string) =>
  to === '/'
    ? route.path === '/'
    : route.path.startsWith(to)

const mobileOpen = ref(false)
watch(() => route.fullPath, () => {
  mobileOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50">
    <div class="relative border-b border-white/15 bg-white/55 backdrop-blur-2xl backdrop-saturate-150 transition-colors dark:border-white/10 dark:bg-gray-950/55">
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/25" />

      <div class="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div class="flex min-w-0 items-center gap-6">
          <NuxtLink
            to="/"
            class="flex shrink-0 items-center gap-2.5"
          >
            <img
              src="/favicon.ico"
              :alt="BRAND.name"
              class="size-8 shrink-0 rounded-lg"
            >
            <span class="truncate text-[15px] font-semibold tracking-tight">{{ BRAND.name }}</span>
          </NuxtLink>

          <!-- 桌面端导航 -->
          <nav class="hidden items-center gap-1.5 md:flex">
            <UButton
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              :label="link.label"
              variant="ghost"
              color="neutral"
              size="sm"
              class="transition-all duration-300 ease-standard hover:-translate-y-px"
              :class="isActive(link.to)
                ? 'bg-primary/10 text-(--ui-primary) font-semibold'
                : 'text-muted'"
            />
          </nav>
        </div>

        <div class="flex items-center gap-1">
          <ColorModeToggle />
          <USelect
            v-model="locale"
            :items="langItems"
            variant="ghost"
            color="neutral"
            size="sm"
            aria-label="切换语言"
            class="w-24"
          />
          <UButton
            :to="LINKS.repo"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
            color="neutral"
            variant="ghost"
            class="hidden sm:inline-flex"
          />
          <!-- 移动端菜单按钮 -->
          <UButton
            :icon="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            square
            variant="ghost"
            color="neutral"
            aria-label="打开菜单"
            class="transition-transform duration-300 ease-emphasized md:hidden"
            @click="mobileOpen = !mobileOpen"
          />
        </div>
      </div>

      <!-- 移动端下拉菜单 -->
      <Transition name="menu">
        <div
          v-if="mobileOpen"
          class="absolute inset-x-0 top-16 border-b border-white/15 bg-white/90 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-gray-950/90 md:hidden"
        >
          <nav class="flex flex-col gap-1 p-3">
            <UButton
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              :label="link.label"
              variant="ghost"
              color="neutral"
              block
              class="justify-start"
              :class="isActive(link.to)
                ? 'bg-primary/10 text-(--ui-primary) font-semibold'
                : 'text-muted'"
            />
          </nav>
        </div>
      </Transition>
    </div>
  </header>
</template>
