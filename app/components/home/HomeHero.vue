<script setup lang="ts">
import { BRAND, LINKS } from '~/constants'

const { t } = useI18n()
const localePath = useLocalePath()
const { latestRelease } = useReleaseDetection()
</script>

<template>
  <section
    id="home-intro"
    class="hero"
    :aria-label="BRAND.name"
  >
    <div class="site-container hero-inner">
      <div
        v-reveal
        class="hero-copy"
      >
        <div class="hero-badges">
          <span class="hero-pill hero-pill--accent">{{ t("home.hero.badge") }}</span>
          <span
            v-if="latestRelease"
            class="hero-pill hero-pill--mono"
          >{{ latestRelease.tag }}</span>
          <span class="hero-pill">{{ t("home.hero.platforms") }}</span>
        </div>
        <h1>{{ BRAND.name }}</h1>
        <p class="section-description">
          {{ t("home.hero.desc") }}
        </p>
        <div class="section-actions">
          <UButton
            :to="localePath('/download')"
            size="lg"
            icon="i-lucide-download"
            :label="t('home.hero.download')"
          />
          <UButton
            :to="localePath('/showcase')"
            size="lg"
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-arrow-right"
            :label="t('home.hero.demo')"
          />
        </div>
        <div class="hero-meta">
          <a
            :href="LINKS.repo"
            target="_blank"
            rel="noopener"
            class="hero-github"
          ><UIcon
            name="i-simple-icons-github"
            class="size-4"
          />{{
            t("home.hero.repo")
          }}<UIcon
            name="i-lucide-arrow-up-right"
            class="size-3.5"
          /></a>
          <span
            class="hero-meta-note"
            aria-hidden="true"
          >·</span>
          <span class="hero-meta-text">{{ t("home.hero.meta") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 整屏 hero：介绍文案在第一屏垂直居中，产品介绍与图整体推到折叠线以下 */
.hero {
  min-height: calc(100svh - var(--site-header-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: clamp(32px, 4vw, 56px);
}
.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 680px;
  text-align: center;
}
.hero-badges {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.hero-pill {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 4px 12px;
  border: 1px solid var(--ecl-border);
  border-radius: 999px;
  background: var(--ecl-surface);
  color: var(--ecl-text-secondary);
  font-size: 12px;
  white-space: nowrap;
}
.hero-pill--mono {
  font-family: var(--font-mono);
  color: var(--ecl-text);
}
.hero-pill--accent {
  border-color: var(--ecl-primary-alpha-strong);
  background: var(--ecl-primary-alpha);
  color: var(--ecl-link);
  font-weight: 500;
}
h1 {
  margin: 20px 0 0;
  font-size: clamp(34px, 4.2vw, 52px);
  line-height: 1.12;
  letter-spacing: -0.03em;
  font-weight: 600;
  text-wrap: balance;
  background: linear-gradient(180deg, var(--ecl-text) 55%, var(--ecl-text-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.hero-copy .section-description {
  max-width: 520px;
  margin-top: 16px;
}
.hero-copy .section-actions {
  margin-top: 24px;
  justify-content: center;
}
.hero-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
  color: var(--ecl-text-tertiary);
  font-size: 13px;
}
.hero-github {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ecl-text-secondary);
  transition: color 150ms var(--ease-standard);
}
.hero-github:hover {
  color: var(--ecl-link);
}
@media (max-width: 767px) {
  .section-actions > a {
    min-height: 44px;
  }
}
</style>
