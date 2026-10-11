<script setup lang="ts">
import { BRAND, LINKS } from '~/constants'

const { t } = useI18n()
</script>

<template>
  <section
    id="home-intro"
    class="home-stage hero-stage"
    tabindex="-1"
    :aria-label="BRAND.name"
  >
    <div class="home-stage-content">
      <div class="home-hero site-container">
        <div class="hero-copy">
          <h1>
            {{ BRAND.name }}
          </h1>
          <p class="section-description">
            {{ t("home.hero.desc") }}
          </p>
          <div class="section-actions">
            <UButton
              to="/download"
              size="xl"
              icon="i-lucide-download"
              :label="t('home.hero.download')"
            />
            <UButton
              to="/showcase"
              size="xl"
              color="neutral"
              variant="ghost"
              trailing-icon="i-lucide-arrow-right"
              :label="t('home.hero.demo')"
            />
          </div>
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
          <p class="hero-meta">
            {{ t("home.hero.meta") }}
          </p>
        </div>
        <div class="hero-visual">
          <HomeLauncherWindowMockup
            :width="962"
            :height="602"
            :alt="t('home.hero.imgAlt')"
            eager
          />
          <p class="hero-caption">
            {{ t("home.hero.caption") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  margin-block: auto;
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 0.88fr 1.3fr;
  align-items: center;
  align-content: center;
  gap: 40px;
}
.hero-copy {
  position: relative;
  z-index: 2;
}
h1 {
  font-size: clamp(32px, 2.9vw, 42px);
  line-height: 1.15;
  letter-spacing: -0.025em;
  font-weight: 600;
  white-space: nowrap;
}
.hero-copy .section-description {
  max-width: 420px;
}
.hero-github {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 26px;
  color: var(--ecl-text-secondary);
  font-size: 13px;
}
.hero-github:hover {
  color: var(--ecl-link);
}
.hero-meta {
  margin-top: 12px;
  font-size: 12px;
  line-height: 1.8;
  color: var(--ecl-text-tertiary);
}
.hero-visual {
  position: relative;
  min-width: 0;
}
.hero-caption {
  text-align: center;
  margin-top: 16px;
  color: var(--ecl-text-tertiary);
  font-size: 12px;
}
@media (max-width: 1023px) {
  .home-hero {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .hero-copy {
    max-width: 660px;
  }
  h1 {
    font-size: clamp(32px, 4.5vw, 42px);
  }
  .hero-visual {
    max-width: 820px;
  }
}
@media (max-width: 767px) {
  .home-hero {
    gap: 36px;
  }
  h1 {
    font-size: clamp(28px, 7.2vw, 40px);
  }
  .hero-copy .section-actions {
    gap: 8px;
  }
}
@media (max-width: 480px) {
  .hero-copy .section-actions {
    display: grid;
    grid-template-columns: 1fr;
  }
  .hero-copy .section-actions > a {
    justify-content: center;
  }
}
</style>
