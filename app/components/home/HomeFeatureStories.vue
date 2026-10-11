<script setup lang="ts">
import { HOME_STAGES } from '~/data/homeStages'

const { t } = useI18n()
const stories = ['instances', 'mods', 'connect', 'plugins']
</script>

<template>
  <section
    v-for="(story, index) in stories"
    :id="HOME_STAGES[index + 1]"
    :key="story"
    class="home-stage feature-stage"
    tabindex="-1"
    :aria-label="t(`home.stories.${story}.title`)"
  >
    <div class="home-stage-content">
      <HomeFeatureStory
        class="site-container"
        :story="story"
        :reverse="index % 2 === 1"
      />
    </div>
  </section>
</template>

<style scoped>
.feature-stage {
  background: var(--ecl-surface);
}
</style>
