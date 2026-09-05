<script setup>
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

const title = 'EuoraCraft Launcher - 现代化 Minecraft 第三方启动器'
const description = 'EuoraCraft Launcher 官方网站：使用 Python 编写的现代化 Minecraft 第三方启动器，支持插件拓展、多账户、实例管理与联机大厅。'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
