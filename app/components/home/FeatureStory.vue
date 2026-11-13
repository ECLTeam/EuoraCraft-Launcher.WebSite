<script setup lang="ts">
defineProps<{ story: string, number?: number, reverse?: boolean }>()
const { t } = useI18n()
</script>

<template>
  <article
    class="feature-story"
    :class="{ 'feature-story--reverse': reverse }"
  >
    <div class="story-copy">
      <span class="eyebrow"><span class="story-num">{{ String(number ?? 1).padStart(2, '0') }}</span>{{ t(`home.stories.${story}.label`) }}</span>
      <h2 class="section-title">
        {{ t(`home.stories.${story}.title`) }}
      </h2>
      <p class="section-description">
        {{ t(`home.stories.${story}.desc`) }}
      </p>
    </div>
    <figure class="story-visual">
      <HomeLauncherWindowMockup
        :src="`/marketing/launcher-${story}.webp`"
        :dark-src="`/marketing/launcher-${story}-dark.webp`"
        :alt="t(`home.stories.${story}.alt`)"
        :width="1264"
        :height="791"
      />
      <figcaption>{{ t("home.stories.imageNote") }}</figcaption>
    </figure>
  </article>
</template>

<style scoped>
.feature-story {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
}
.feature-story--reverse {
  grid-template-columns: 1.2fr 0.8fr;
}
.feature-story--reverse .story-copy {
  order: 2;
}
.story-copy {
  max-width: 420px;
}
.story-num {
  margin-right: 10px;
  color: var(--ecl-text-tertiary);
  font-weight: 400;
}
.story-copy .eyebrow {
  display: flex;
  align-items: center;
}
.story-copy .section-title {
  font-size: clamp(24px, 2.6vw, 34px);
}
.story-copy .section-description {
  margin-top: 14px;
  font-size: 15px;
  line-height: 1.8;
}
.story-visual {
  min-width: 0;
  margin: 0;
}
figcaption {
  margin-top: 12px;
  font-size: 11px;
  color: var(--ecl-text-tertiary);
}
@media (max-width: 1023px) {
  .feature-story,
  .feature-story--reverse {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .feature-story--reverse .story-copy {
    order: 0;
  }
  .story-copy {
    max-width: 600px;
  }
}
</style>
