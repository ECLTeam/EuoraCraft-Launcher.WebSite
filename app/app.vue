<script setup lang="ts">
import { BRAND } from '~/constants'

const { t, locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const pageKeys: Record<string, string> = { '/features': 'featuresPage.title', '/download': 'download.title', '/docs': 'nav.docs', '/about': 'nav.about', '/showcase': 'nav.showcase' }
const title = computed(() => pageKeys[route.path] ? `${t(pageKeys[route.path]!)} · ${BRAND.name}` : t('seo.title'))
const siteUrl = computed(() => String(config.public.siteUrl).replace(/\/$/, ''))
useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: siteUrl.value ? [{ rel: 'canonical', href: `${siteUrl.value}${route.path}` }] : []
}))
useSeoMeta({
  title: () => title.value,
  description: () => t('seo.description'),
  ogTitle: () => title.value,
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogImage: () => `${siteUrl.value}/marketing/og-cover.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => t('home.hero.imgAlt'),
  ogLocale: () => locale.value === 'en-US' ? 'en_US' : 'zh_CN',
  twitterCard: 'summary_large_image',
  twitterImage: () => `${siteUrl.value}/marketing/og-cover.png`
})
</script>

<template>
  <UApp class="site-shell">
    <a
      href="#main-content"
      class="skip-link"
    >{{ t('a11y.skip') }}</a>
    <EclAuroraBackdrop />
    <AppHeader />
    <main
      id="main-content"
      class="site-main"
      tabindex="-1"
    >
      <NuxtPage />
    </main>
    <AppFooter />
  </UApp>
</template>
