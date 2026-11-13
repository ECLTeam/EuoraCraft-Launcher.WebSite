<script setup lang="ts">
import { BRAND } from '~/constants'

const { t, locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()

// 路径 → seo.pages 的键；首页走 seo.title
const pageKey: Record<string, string> = {
  '/features': 'features',
  '/download': 'download',
  '/docs': 'docs',
  '/about': 'about',
  '/showcase': 'showcase'
}
// 语言由 URL 决定：/en/* 为英文版本
const isEn = computed(() => route.meta.locale === 'en-US')
// 去掉 /en 前缀与尾斜杠后的语言无关路径：查 SEO 字典、生成两种语言地址都基于它
const basePath = computed(() => {
  const raw = isEn.value ? route.path.replace(/^\/en(?=\/|$)/, '') : route.path
  const trimmed = raw.replace(/\/+$/, '')
  return trimmed || '/'
})
const seoKey = computed(() => pageKey[basePath.value])
const pageTitle = computed(() => seoKey.value ? t(`seo.pages.${seoKey.value}.title`) : '')
const title = computed(() => seoKey.value
  ? `${pageTitle.value} · ${BRAND.name}`
  : t('seo.title'))
const description = computed(() => seoKey.value
  ? t(`seo.pages.${seoKey.value}.description`)
  : t('seo.description'))

const siteUrl = computed(() => String(config.public.siteUrl).replace(/\/$/, ''))
// 静态托管对目录页会 301 到带尾斜杠的地址，canonical 直接输出最终形式，避免多一跳
const trailing = (path: string) => path === '/' ? '/' : `${path.replace(/\/$/, '')}/`
const zhUrl = computed(() => `${siteUrl.value}${trailing(basePath.value)}`)
const enUrl = computed(() => basePath.value === '/'
  ? `${siteUrl.value}/en/`
  : `${siteUrl.value}/en${trailing(basePath.value)}`)
const canonical = computed(() => isEn.value ? enUrl.value : zhUrl.value)
// 在线体验为嵌入演示页，内容单一，避免与主站页面争夺索引
const robots = computed(() => basePath.value === '/showcase'
  ? 'noindex, follow'
  : 'index, follow, max-image-preview:large')

const ogImage = computed(() => `${siteUrl.value}/marketing/og-cover.jpg`)

// 结构化数据：让搜索引擎把站点识别为一个具体的软件实体（名称、类别、协议、下载地址）
const jsonLd = computed(() => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': BRAND.name,
    'alternateName': BRAND.shortName,
    'applicationCategory': 'GameApplication',
    'applicationSubCategory': 'Minecraft launcher',
    'operatingSystem': 'Windows, macOS, Linux',
    'description': t('seo.description'),
    'url': siteUrl.value,
    'downloadUrl': 'https://github.com/ECLTeam/EuoraCraft-Launcher/releases',
    'license': 'https://www.gnu.org/licenses/gpl-3.0.html',
    'isAccessibleForFree': true,
    'inLanguage': locale.value,
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'CNY' },
    'publisher': {
      '@type': 'Organization',
      'name': BRAND.org,
      'url': siteUrl.value,
      'logo': `${siteUrl.value}/icon-512.png`,
      'email': BRAND.email
    }
  }
  return JSON.stringify(data).replace(/</g, '\\u003c')
})

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: [
    { rel: 'canonical', href: canonical.value },
    // 两种语言互相声明，并给出默认版本，避免被判定为重复内容
    { rel: 'alternate', hreflang: 'zh-CN', href: zhUrl.value },
    { rel: 'alternate', hreflang: 'en', href: enUrl.value },
    { rel: 'alternate', hreflang: 'x-default', href: zhUrl.value },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }
  ],
  meta: [
    { name: 'theme-color', content: '#e7e7ea', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#0a0a0a', media: '(prefers-color-scheme: dark)' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  script: [
    { type: 'application/ld+json', innerHTML: jsonLd.value }
  ]
}))

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  robots: () => robots.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogType: 'website',
  ogSiteName: () => BRAND.name,
  ogUrl: () => canonical.value,
  ogImage: () => ogImage.value,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => t('home.hero.imgAlt'),
  ogLocale: () => isEn.value ? 'en_US' : 'zh_CN',
  ogLocaleAlternate: () => isEn.value ? ['zh_CN'] : ['en_US'],
  twitterCard: 'summary_large_image',
  twitterTitle: () => title.value,
  twitterDescription: () => description.value,
  twitterImage: () => ogImage.value
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
