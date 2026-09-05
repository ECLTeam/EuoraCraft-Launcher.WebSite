<script setup lang="ts">
import { BRAND, LINKS, TECH_STACK } from '~/constants'
import { features } from '~/data/features'

import show1 from '~/img/show-1.png'
import show1Black from '~/img/show-1-black.png'

const colorMode = useColorMode()
const heroImg = computed(() => (colorMode.value === 'dark' ? show1Black : show1))

const overviewFeatures = computed(() => features.slice(0, 6))
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative flex min-h-[calc(100vh-4rem)] items-center">
      <div class="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div class="max-w-xl">
          <UBadge
            color="primary"
            variant="subtle"
          >
            Minecraft 第三方启动器
          </UBadge>

          <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {{ BRAND.name }}
          </h1>

          <p class="mt-4 text-lg text-muted">
            {{ BRAND.tagline }}
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <UButton
              to="/download"
              size="lg"
              icon="i-lucide-download"
              label="立即下载"
              block
              class="sm:w-auto"
            />
            <UButton
              to="/features"
              size="lg"
              color="neutral"
              variant="subtle"
              icon="i-lucide-sparkles"
              label="了解特性"
              block
              class="sm:w-auto"
            />
          </div>

          <div class="mt-8 flex items-center gap-1 text-sm text-muted">
            <UIcon
              name="i-simple-icons-github"
              class="size-4"
            />
            <a
              :href="LINKS.repo"
              target="_blank"
              rel="noopener"
              class="hover:text-(--ui-primary)"
            >
              开源仓库 · GPL-3.0
            </a>
          </div>
        </div>

        <div class="relative">
          <img
            :src="heroImg"
            alt="EuoraCraft Launcher 界面截图"
            class="w-full rounded-2xl border border-(--ui-border) shadow-2xl"
          >
        </div>
      </div>
    </section>

    <!-- 特性概览 -->
    <section class="border-t border-(--ui-border)">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold tracking-tight">
            核心特性
          </h2>
          <p class="mt-3 text-muted">
            从插件系统到联机大厅，为你的个性化需求而生。
          </p>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="feature in overviewFeatures"
            :key="feature.title"
            class="rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 p-6 backdrop-blur transition-shadow hover:shadow-lg"
          >
            <UIcon
              :name="feature.icon"
              class="size-7 text-(--ui-primary)"
            />
            <h3 class="mt-4 font-semibold">
              {{ feature.title }}
            </h3>
            <p class="mt-2 text-sm text-muted">
              {{ feature.description }}
            </p>
          </div>
        </div>

        <div class="mt-10">
          <UButton
            to="/features"
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-arrow-right"
            label="查看全部特性"
          />
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="border-t border-(--ui-border)">
      <div class="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight">
          技术栈
        </h2>
        <p class="mt-2 text-muted">
          坚固的后端与现代化的前端共同驱动。
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span
            v-for="tech in TECH_STACK"
            :key="tech"
            class="rounded-full border border-(--ui-border) bg-(--ui-bg)/80 px-4 py-1.5 font-mono text-sm text-muted"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </section>

    <!-- 下载引导 -->
    <section class="border-t border-(--ui-border)">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="rounded-2xl border border-(--ui-border) p-8 text-center sm:p-12">
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            准备好开始了吗？
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-muted">
            从 GitHub Releases 下载最新版本，支持 Windows、Linux 与 macOS。
          </p>
          <div class="mt-6">
            <UButton
              to="/download"
              size="lg"
              icon="i-lucide-download"
              label="前往下载"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
