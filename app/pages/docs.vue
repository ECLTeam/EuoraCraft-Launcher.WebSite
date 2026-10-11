<script setup lang="ts">
import { DOCS } from '~/constants'

const { t, locale } = useI18n()
</script>

<template>
  <div>
    <PageHeader
      :title="t('nav.docs')"
      :description="t('docs.desc')"
    />

    <div class="site-container pb-16 pt-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="doc in DOCS"
          :key="doc.key"
          v-reveal
          :href="locale === 'en-US' && doc.hrefEn ? doc.hrefEn : doc.href"
          target="_blank"
          rel="noopener"
          class="ecl-surface ecl-surface--classic ecl-surface--interactive group flex flex-col p-6"
        >
          <h2 class="font-semibold group-hover:text-(--ecl-link)">
            {{ t(`docsItems.${doc.key}.title`) }}
          </h2>
          <p class="mt-2 flex-1 text-sm text-muted">
            {{ t(`docsItems.${doc.key}.desc`) }}
          </p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm ecl-link">
            {{ t("docs.view") }}
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
