<script setup lang="ts">
import { BRAND, LICENSE, LINKS, TECH_STACK } from '~/constants'
import aboutZh from '~/content/about.zh-CN.md?raw'
import aboutEn from '~/content/about.en-US.md?raw'

const { t, locale } = useI18n()
// 介绍正文为 markdown 源文本，按当前语言加载渲染；缺省回退中文
const introMd = computed(() => (locale.value === 'en-US' ? aboutEn : aboutZh))
</script>

<template>
  <div>
    <PageHeader
      :title="t('nav.about')"
      :description="t('brand.tagline')"
    />

    <div class="site-container pb-16 pt-8">
      <div class="grid gap-10 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div v-reveal>
            <h2 class="text-xl font-bold">
              {{ t("about.intro.title") }}
            </h2>
            <MdContent
              :source="introMd"
              class="mt-3"
            />
          </div>

          <div v-reveal>
            <h3 class="mt-8 text-lg font-semibold">
              {{ t("about.stack") }}
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
          </div>

          <div v-reveal>
            <h3 class="mt-8 text-lg font-semibold">
              {{ t("about.license.title") }}
            </h3>
            <p class="mt-3 text-muted">
              {{
                t("about.license.text", {
                  code: LICENSE.code,
                  images: LICENSE.images
                })
              }}
            </p>
          </div>

          <div v-reveal>
            <h3 class="mt-8 text-lg font-semibold">
              {{ t("about.disclaimer") }}
            </h3>
            <p class="mt-3 text-sm text-muted">
              {{ t("disclaimer") }}
            </p>
          </div>
        </div>

        <aside class="space-y-4">
          <div
            v-reveal
            class="ecl-surface ecl-surface--classic ecl-surface--interactive p-6"
          >
            <h3 class="font-semibold">
              {{ t("about.sidebar.org") }}
            </h3>
            <p class="mt-2 text-sm text-muted">
              {{ BRAND.org }}
            </p>
            <h3 class="mt-6 font-semibold">
              {{ t("about.sidebar.contact") }}
            </h3>
            <a
              :href="`mailto:${BRAND.email}`"
              class="mt-1 inline-block text-sm ecl-link"
            >
              {{ BRAND.email }}
            </a>
            <h3 class="mt-6 font-semibold">
              {{ t("about.sidebar.links") }}
            </h3>
            <nav
              class="mt-2 flex flex-col items-start gap-2 text-sm text-muted"
            >
              <a
                :href="LINKS.repo"
                target="_blank"
                rel="noopener"
                class="hover:ecl-link"
              >{{ t("about.sidebar.repo") }}</a>
              <a
                :href="LINKS.releases"
                target="_blank"
                rel="noopener"
                class="hover:ecl-link"
              >{{ t("about.sidebar.releases") }}</a>
              <a
                :href="locale === 'en-US' ? LINKS.docsEn : LINKS.docs"
                target="_blank"
                rel="noopener"
                class="hover:ecl-link"
              >{{ t("about.sidebar.docs") }}</a>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
