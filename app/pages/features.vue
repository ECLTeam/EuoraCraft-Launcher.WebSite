<script setup lang="ts">
import { featureKeys } from '~/data/features'

const { t } = useI18n()
</script>

<template>
  <div>
    <PageHeader
      :title="t('featuresPage.title')"
      :description="t('featuresPage.desc')"
    />

    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(key, i) in featureKeys"
          :key="key"
          v-reveal
          :delay="(i % 3) * 70"
          class="card-outline rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 p-6 backdrop-blur"
        >
          <UIcon
            :name="t(`featureItems.${key}.icon`)"
            class="size-7 text-(--ui-primary)"
          />
          <h2 class="mt-4 text-lg font-semibold">
            {{ t(`featureItems.${key}.title`) }}
          </h2>
          <p class="mt-2 text-sm text-muted">
            {{ t(`featureItems.${key}.desc`) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
