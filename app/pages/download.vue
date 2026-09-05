<script setup lang="ts">
import { DISCLAIMER, LINKS } from '~/constants'

const platforms = [
  { icon: 'i-simple-icons-windows', name: 'Windows', arch: 'x64' },
  { icon: 'i-simple-icons-linux', name: 'Linux', arch: 'x86_64' },
  { icon: 'i-simple-icons-apple', name: 'macOS', arch: 'x86_64' },
  { icon: 'i-simple-icons-archlinux', name: 'Arch Linux', arch: 'x64' }
]
</script>

<template>
  <div>
    <PageHeader
      title="下载"
      description="从 GitHub Releases 获取最新版本。首次使用请先查阅文档与使用教程。"
    />

    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="flex flex-col items-start gap-4 rounded-2xl border border-(--ui-border) p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-xl font-bold">
            最新版本
          </h2>
          <p class="mt-1 text-sm text-muted">
            访问 GitHub Releases 页面下载对应平台的安装包。
          </p>
        </div>
        <UButton
          :to="LINKS.releases"
          target="_blank"
          size="lg"
          icon="i-simple-icons-github"
          label="前往 Releases 下载"
        />
      </div>

      <div class="mt-8">
        <h3 class="font-semibold">
          支持平台
        </h3>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="platform in platforms"
            :key="platform.name"
            class="rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 p-5 text-center backdrop-blur"
          >
            <UIcon
              :name="platform.icon"
              class="mx-auto size-8"
            />
            <p class="mt-3 font-semibold">
              {{ platform.name }}
            </p>
            <p class="mt-1 font-mono text-xs text-muted">
              {{ platform.arch }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-10 rounded-2xl border border-(--ui-border) p-6">
        <h3 class="font-semibold">
          更新方式
        </h3>
        <p class="mt-2 text-sm text-muted">
          本项目不提供自动更新，基于 GitHub Releases 发布安装包，由用户从 Release 页面手动下载更新。请留意 Release 页面获取最新版本。
        </p>
      </div>

      <p class="mt-8 text-xs text-muted">
        {{ DISCLAIMER }}
      </p>
    </div>
  </div>
</template>
