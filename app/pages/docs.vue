<script setup lang="ts">
import { DOCS } from '~/constants'

const { t } = useI18n()
</script>

<template>
  <div>
    <PageHeader
      :title="t('nav.docs')"
      :description="t('docs.desc')"
    />

    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="(doc, i) in DOCS"
          :key="doc.key"
          v-reveal
          :delay="(i % 3) * 70"
          :href="doc.href"
          target="_blank"
          rel="noopener"
          class="card-outline group flex flex-col rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 p-6 backdrop-blur"
        >
          <h2 class="font-semibold group-hover:text-(--ui-primary)">{{ t(`docsItems.${doc.key}.title`) }}</h2>
          <p class="mt-2 flex-1 text-sm text-muted">{{ t(`docsItems.${doc.key}.desc`) }}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm text-(--ui-primary)">
            {{ t('docs.view') }}
            <UIcon
              name="i-lucide-arrow-up-right"
              class="size-4 transition-transform duration-300 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
