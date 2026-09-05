<script setup lang="ts">
import { BRAND, LINKS, TECH_STACK } from '~/constants'
import { featureKeys } from '~/data/features'

import show1 from '~/img/show-1.png'
import show1Black from '~/img/show-1-black.png'

const { t } = useI18n()
const colorMode = useColorMode()

const heroImg = computed(() => (colorMode.value === 'dark' ? show1Black : show1))
const overviewKeys = computed(() => featureKeys.slice(0, 6))
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      <div class="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div
          v-reveal
          class="max-w-xl"
        >
          <UBadge
            color="primary"
            variant="subtle"
          >
            {{ t('brand.badge') }}
          </UBadge>

          <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {{ BRAND.name }}
          </h1>

          <p class="mt-4 text-lg text-muted">
            {{ t('brand.tagline') }}
          </p>

          <div
            v-reveal
            class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <UButton
              to="/download"
              size="lg"
              icon="i-lucide-download"
              :label="t('home.hero.download')"
              block
              class="sm:w-auto"
            />
            <UButton
              to="/features"
              size="lg"
              color="neutral"
              variant="subtle"
              icon="i-lucide-sparkles"
              :label="t('home.hero.learn')"
              block
              class="sm:w-auto"
            />
          </div>

          <div
            v-reveal
            class="mt-8 flex items-center gap-1 text-sm text-muted"
          >
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
              {{ t('home.hero.repo') }}
            </a>
          </div>
        </div>

        <div
          v-reveal
          :delay="120"
          class="relative"
        >
          <img
            :src="heroImg"
            :alt="t('home.hero.imgAlt')"
            class="w-full rounded-2xl border border-(--ui-border) shadow-2xl"
          >
        </div>
      </div>
    </section>

    <!-- 特性概览 -->
    <section class="border-t border-(--ui-border)">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div
          v-reveal
          class="max-w-2xl"
        >
          <h2 class="text-3xl font-bold tracking-tight">
            {{ t('home.features.title') }}
          </h2>
          <p class="mt-3 text-muted">
            {{ t('home.features.desc') }}
          </p>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(key, i) in overviewKeys"
            :key="key"
            v-reveal
            :delay="i * 70"
            class="card-outline rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 p-6 backdrop-blur"
          >
            <UIcon
              :name="t(`featureItems.${key}.icon`)"
              class="size-7 text-(--ui-primary)"
            />
            <h3 class="mt-4 font-semibold">
              {{ t(`featureItems.${key}.title`) }}
            </h3>
            <p class="mt-2 text-sm text-muted">
              {{ t(`featureItems.${key}.desc`) }}
            </p>
          </div>
        </div>

        <div
          v-reveal
          class="mt-10"
        >
          <UButton
            to="/features"
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-arrow-right"
            :label="t('home.features.viewAll')"
          />
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="border-t border-(--ui-border)">
      <div class="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div v-reveal>
          <h2 class="text-2xl font-bold tracking-tight">
            {{ t('home.stack.title') }}
          </h2>
          <p class="mt-2 text-muted">
            {{ t('home.stack.desc') }}
          </p>
        </div>
        <div
          v-reveal
          :delay="100"
          class="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
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
        <div
          v-reveal
          class="card-lift rounded-2xl border border-(--ui-border) p-8 text-center sm:p-12"
        >
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            {{ t('home.cta.title') }}
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-muted">
            {{ t('home.cta.desc') }}
          </p>
          <div
            class="mt-6 flex justify-center transition-transform duration-300 ease-standard hover:-translate-y-px"
          >
            <UButton
              to="/download"
              size="lg"
              icon="i-lucide-download"
              :label="t('home.cta.button')"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
