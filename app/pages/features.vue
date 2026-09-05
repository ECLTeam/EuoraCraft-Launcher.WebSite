<script setup lang="ts">
import { features } from '~/data/features'
</script>

<template>
  <div>
    <PageHeader
      title="特性"
      description="EuoraCraft Launcher 的核心能力，覆盖插件拓展、账户、实例与联机等方方面面。"
    />

    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          v-reveal
          :delay="(i % 3) * 70"
          class="card-lift rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 p-6 backdrop-blur"
        >
          <UIcon
            :name="feature.icon"
            class="size-7 text-(--ui-primary)"
          />
          <h2 class="mt-4 text-lg font-semibold">
            {{ feature.title }}
          </h2>
          <p class="mt-2 text-sm text-muted">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>