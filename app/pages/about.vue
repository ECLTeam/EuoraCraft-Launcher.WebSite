<script setup lang="ts">
import { BRAND, DISCLAIMER, LICENSE, LINKS, TECH_STACK } from '~/constants'
</script>

<template>
  <div>
    <PageHeader
      title="关于"
      :description="BRAND.tagline"
    />

    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <h2 class="text-xl font-bold">
            项目介绍
          </h2>
          <p class="mt-3 text-muted">
            {{ BRAND.name }}（ECL）是一款现代化、可插拔的 Minecraft 第三方启动器，采用
            Python + Tauri 构建。只需编写少量代码即可通过插件系统扩展启动器功能，满足个性化需求。
          </p>
          <p class="mt-3 text-muted">
            它提供多账户登录、多版本实例管理、内置联机大厅与国际化的开箱即用体验，同时通过声明式权限模型保障插件运行的安全边界。
          </p>

          <h3 class="mt-8 text-lg font-semibold">
            技术栈
          </h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="tech in TECH_STACK"
              :key="tech"
              class="rounded-full border border-(--ui-border) bg-(--ui-bg)/80 px-3 py-1 font-mono text-xs text-muted"
            >
              {{ tech }}
            </span>
          </div>

          <h3 class="mt-8 text-lg font-semibold">
            开源许可
          </h3>
          <p class="mt-3 text-muted">
            项目源代码遵循 {{ LICENSE.code }}；Logo 与图片素材遵循 {{ LICENSE.images }}。
            源码托管于
            <a
              :href="LINKS.repo"
              target="_blank"
              rel="noopener"
              class="text-(--ui-primary)"
            >GitHub</a>。
          </p>

          <h3 class="mt-8 text-lg font-semibold">
            免责声明
          </h3>
          <p class="mt-3 text-sm text-muted">
            {{ DISCLAIMER }}
          </p>
        </div>

        <aside class="space-y-4">
          <div class="rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 p-6 backdrop-blur">
            <h3 class="font-semibold">
              组织
            </h3>
            <p class="mt-2 text-sm text-muted">
              {{ BRAND.org }}
            </p>
            <h3 class="mt-6 font-semibold">
              联系
            </h3>
            <a
              :href="`mailto:${BRAND.email}`"
              class="mt-1 inline-block text-sm text-(--ui-primary)"
            >
              {{ BRAND.email }}
            </a>
            <h3 class="mt-6 font-semibold">
              链接
            </h3>
            <nav class="mt-2 flex flex-col items-start gap-2 text-sm text-muted">
              <a
                :href="LINKS.repo"
                target="_blank"
                rel="noopener"
                class="hover:text-(--ui-primary)"
              >GitHub 仓库</a>
              <a
                :href="LINKS.releases"
                target="_blank"
                rel="noopener"
                class="hover:text-(--ui-primary)"
              >版本发布</a>
              <a
                :href="LINKS.wiki"
                target="_blank"
                rel="noopener"
                class="hover:text-(--ui-primary)"
              >项目文档</a>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
