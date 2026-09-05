<script setup lang="ts">
import { BRAND, DISCLAIMER, LICENSE, LINKS } from '~/constants'

const now = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-(--ui-border)">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <div class="flex items-center gap-2.5">
            <img
              src="/favicon.ico"
              :alt="BRAND.name"
              class="size-8 shrink-0 rounded-lg"
            >
            <span class="font-semibold">{{ BRAND.name }}</span>
          </div>
          <p class="mt-3 max-w-xs text-sm text-muted">
            {{ BRAND.tagline }}
          </p>
          <div class="mt-4 flex items-center gap-1">
            <UButton
              :to="LINKS.repo"
              target="_blank"
              icon="i-simple-icons-github"
              aria-label="GitHub"
              color="neutral"
              variant="ghost"
            />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold">
            导航
          </h3>
          <nav class="mt-3 flex flex-col items-start gap-2 text-sm text-muted">
            <NuxtLink
              to="/"
              class="hover:text-(--ui-primary)"
            >首页</NuxtLink>
            <NuxtLink
              to="/features"
              class="hover:text-(--ui-primary)"
            >特性</NuxtLink>
            <NuxtLink
              to="/download"
              class="hover:text-(--ui-primary)"
            >下载</NuxtLink>
            <NuxtLink
              to="/docs"
              class="hover:text-(--ui-primary)"
            >文档</NuxtLink>
            <NuxtLink
              to="/about"
              class="hover:text-(--ui-primary)"
            >关于</NuxtLink>
          </nav>
        </div>

        <div>
          <h3 class="text-sm font-semibold">
            项目
          </h3>
          <nav class="mt-3 flex flex-col items-start gap-2 text-sm text-muted">
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
            <a
              :href="LINKS.issues"
              target="_blank"
              rel="noopener"
              class="hover:text-(--ui-primary)"
            >提交 Issue</a>
          </nav>
        </div>
      </div>

      <div class="mt-10 border-t border-(--ui-border) pt-6">
        <p class="text-xs text-muted">
          © {{ now }} {{ BRAND.org }} · 代码遵循 {{ LICENSE.code }}，Logo 与图片遵循
          {{ LICENSE.images }}。
        </p>
        <p class="mt-2 text-xs text-muted">
          {{ DISCLAIMER }}
        </p>
      </div>
    </div>
  </footer>
</template>
