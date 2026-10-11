<script setup lang="ts">
import { LINKS } from '~/constants'

const { t } = useI18n()
</script>

<template>
  <section
    id="home-opensource"
    class="site-container open-source"
    :aria-label="t('home.opensource.title')"
  >
    <div>
      <span class="eyebrow">{{ t("home.opensource.eyebrow") }}</span>
      <h2 class="section-title">
        {{ t("home.opensource.title") }}
      </h2>
      <p class="section-description">
        {{ t("home.opensource.desc") }}
      </p>
      <div class="section-actions">
        <UButton
          :to="LINKS.repo"
          target="_blank"
          icon="i-simple-icons-github"
          color="neutral"
          variant="outline"
          :label="t('home.opensource.github')"
        /><UButton
          :to="LINKS.issues"
          target="_blank"
          icon="i-lucide-message-square"
          color="neutral"
          variant="ghost"
          :label="t('home.opensource.issues')"
        /><UButton
          to="/docs"
          icon="i-lucide-book-open"
          color="neutral"
          variant="ghost"
          :label="t('home.opensource.docs')"
        />
      </div>
    </div>
    <div class="community-values">
      <div
        v-for="(key, index) in ['license', 'plugins', 'community']"
        :key="key"
      >
        <UIcon
          :name="['i-lucide-code', 'i-lucide-puzzle', 'i-lucide-users'][index]!"
          class="size-5"
        /><span>{{ t(`home.opensource.${key}`) }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.open-source {
  padding-block: 64px 48px;
  display: grid;
  grid-template-columns: 1.2fr 0.6fr;
  align-items: center;
  gap: 56px;
}
.open-source .section-title {
  font-size: clamp(24px, 2.1vw, 30px);
  font-weight: 600;
}
.open-source .section-description {
  margin-top: 12px;
  max-width: 640px;
  font-size: 14px;
  line-height: 1.85;
  text-wrap: balance;
}
.open-source .section-actions {
  margin-top: 20px;
}
.community-values {
  display: grid;
  gap: 20px;
  padding-left: 32px;
  border-left: 1px solid var(--ecl-border);
}
.community-values > div {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
}
.community-values :deep(.iconify) {
  color: var(--ecl-link);
}
@media (max-width: 1023px) {
  .open-source {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .community-values {
    padding-left: 0;
    border: 0;
  }
}
</style>
