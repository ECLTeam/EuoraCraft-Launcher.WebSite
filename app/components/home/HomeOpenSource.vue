<script setup lang="ts">
import { LINKS } from '~/constants'

const { t } = useI18n()
</script>

<template>
  <section
    id="home-opensource"
    class="open-source"
    :aria-label="t('home.opensource.title')"
  >
    <div class="site-container open-source-grid">
      <div
        v-reveal
        class="open-source-copy"
      >
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
      <div
        v-reveal="{ delay: 80 }"
        class="community-values"
      >
        <div
          v-for="(key, index) in ['license', 'plugins', 'community']"
          :key="key"
          class="community-item"
        >
          <span class="community-icon">
            <UIcon
              :name="['i-lucide-code', 'i-lucide-puzzle', 'i-lucide-users'][index]!"
              class="size-4"
            />
          </span>
          <span>{{ t(`home.opensource.${key}`) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.open-source {
  padding-block: clamp(56px, 7vw, 96px);
  border-top: 1px solid var(--ecl-divider);
}
.open-source-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.6fr;
  align-items: center;
  gap: clamp(32px, 5vw, 64px);
}
.open-source .section-title {
  font-size: clamp(22px, 2.2vw, 30px);
}
.open-source .section-description {
  margin-top: 14px;
  max-width: 560px;
  font-size: 15px;
  line-height: 1.8;
}
.open-source .section-actions {
  margin-top: 20px;
}
.community-values {
  display: grid;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--ecl-border);
  border-radius: var(--ecl-radius-card);
  background: var(--ecl-surface-muted);
  box-shadow: var(--ecl-shadow-surface);
}
.community-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 40px;
  padding-inline: 8px;
  font-size: 14px;
}
.community-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  color: var(--ecl-link);
  border: 1px solid var(--ecl-border);
  border-radius: 8px;
  background: var(--ecl-surface);
}
@media (max-width: 1023px) {
  .open-source-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
