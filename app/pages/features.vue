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

    <div class="site-container pb-16 pt-8">
      <p class="mb-6 text-sm leading-7 text-muted">
        {{ t('featuresPage.versionNote') }}
      </p>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(key, i) in featureKeys"
          :key="key"
          v-reveal="{ delay: (i % 3) * 70 }"
          class="ecl-surface ecl-surface--classic ecl-surface--interactive p-6"
        >
          <UIcon
            :name="t(`featureItems.${key}.icon`)"
            class="size-7 ecl-link"
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
