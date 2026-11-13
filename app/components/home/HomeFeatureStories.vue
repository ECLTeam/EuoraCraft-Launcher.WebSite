<script setup lang="ts">
import { HOME_STAGES } from '~/data/homeStages'

const { t } = useI18n()
const stories = ['instances', 'mods', 'plugins']
</script>

<template>
  <section
    class="stories"
    :aria-label="t('home.stories.title')"
  >
    <div class="site-container">
      <div
        v-reveal
        class="stories-intro"
      >
        <span class="eyebrow">{{ t("home.stories.eyebrow") }}</span>
        <h2 class="section-title">
          {{ t("home.stories.title") }}
        </h2>
        <p class="section-description">
          {{ t("home.stories.desc") }}
        </p>
      </div>
      <div
        v-reveal="{ delay: 80 }"
        class="stories-shot"
      >
        <div class="shot-glow">
          <HomeLauncherWindowMockup
            :width="1264"
            :height="791"
            :alt="t('home.hero.imgAlt')"
            eager
          />
        </div>
        <p class="shot-caption">
          {{ t("home.hero.caption") }}
        </p>
      </div>
      <div class="stories-more">
        <UButton
          to="/features"
          color="neutral"
          variant="ghost"
          trailing-icon="i-lucide-arrow-right"
          :label="t('home.stories.viewAll')"
        />
      </div>
    </div>
    <div
      v-for="(story, index) in stories"
      :id="HOME_STAGES[index + 1]"
      :key="story"
      class="story-section"
      :aria-label="t(`home.stories.${story}.title`)"
    >
      <div class="site-container">
        <HomeFeatureStory
          v-reveal
          :story="story"
          :number="index + 1"
          :reverse="index % 2 === 1"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 产品介绍段：居中标题 + 总览截图（图是介绍的一部分），下方是编号故事分段 */
.stories-intro {
  max-width: 640px;
  margin-inline: auto;
  padding-block: clamp(56px, 7vw, 96px) 0;
  text-align: center;
}
.stories-intro .section-description {
  max-width: 520px;
  margin-top: 14px;
  margin-inline: auto;
}
.stories-shot {
  max-width: 920px;
  margin-top: clamp(24px, 3vw, 40px);
  margin-inline: auto;
}
/* 截图后方的强调色柔光 */
.shot-glow {
  position: relative;
}
.shot-glow::before {
  content: "";
  position: absolute;
  inset: -12% -10%;
  z-index: 0;
  background: radial-gradient(56% 60% at 50% 42%, var(--ecl-glow), transparent 72%);
  pointer-events: none;
}
.shot-glow > * {
  position: relative;
  z-index: 1;
}
.shot-caption {
  margin-top: 14px;
  text-align: center;
  color: var(--ecl-text-tertiary);
  font-size: 12px;
}
.stories-more {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
/* 各段之间用分隔线划分节奏，背景保持画布色，不做明暗交替色带 */
.story-section {
  padding-block: clamp(56px, 7vw, 96px);
  border-top: 1px solid var(--ecl-divider);
}
.story-section:first-of-type {
  margin-top: clamp(56px, 7vw, 96px);
}
</style>
