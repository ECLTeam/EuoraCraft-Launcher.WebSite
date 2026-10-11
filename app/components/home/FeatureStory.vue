<script setup lang="ts">
defineProps<{ story: string, reverse?: boolean }>()
const { t } = useI18n()
</script>

<template>
  <article
    class="feature-story"
    :class="{ 'feature-story--reverse': reverse }"
  >
    <div class="story-copy">
      <span class="eyebrow">{{ t(`home.stories.${story}.label`) }}</span>
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
        :width="1280"
        :height="800"
      />
      <figcaption>{{ t("home.stories.imageNote") }}</figcaption>
    </figure>
  </article>
</template>

<style scoped>
.feature-story {
  display: grid;
  grid-template-columns: 0.85fr 1.2fr;
  align-items: center;
  gap: 48px;
  margin-block: auto;
  flex-shrink: 0;
}
.feature-story--reverse {
  grid-template-columns: 1.2fr 0.85fr;
}
.feature-story--reverse .story-copy {
  order: 2;
}
.story-copy {
  max-width: 410px;
}
.story-copy .section-title {
  font-size: clamp(25px, 2.5vw, 34px);
}
.story-visual {
  min-width: 0;
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
