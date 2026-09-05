<script setup lang="ts">
import { BRAND, LINKS } from '~/constants'

const links = [
  { label: '首页', to: '/' },
  { label: '特性', to: '/features' },
  { label: '下载', to: '/download' },
  { label: '文档', to: '/docs' },
  { label: '关于', to: '/about' }
]

const route = useRoute()
const isActive = (to: string) =>
  to === '/'
    ? route.path === '/'
    : route.path.startsWith(to)
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

          <nav class="hidden items-center gap-1 md:flex">
            <UButton
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              :label="link.label"
              :active="isActive(link.to)"
              default-variant="ghost"
              color="neutral"
              size="sm"
              :class="isActive(link.to) ? 'text-(--ui-primary) font-semibold' : ''"
            />
          </nav>
        </div>

        <div class="flex items-center gap-1">
          <UColorModeButton />
          <UButton
            :to="LINKS.repo"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
            color="neutral"
            variant="ghost"
          />
        </div>
      </div>
    </div>
  </header>
</template>
