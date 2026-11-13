<script setup lang="ts">
const { t } = useI18n()
const { latestRelease, status } = useReleaseDetection()
</script>

<template>
  <section
    id="home-download"
    class="cta-section"
    :aria-label="t('home.cta.title')"
  >
    <div class="site-container">
      <div
        v-reveal
        class="cta-card"
      >
        <h2>{{ t("home.cta.title") }}</h2>
        <div
          class="cta-version"
          aria-live="polite"
        >
          <template v-if="latestRelease">
            <span class="cta-tag">{{ latestRelease.tag }}</span>
            <span>{{ t(latestRelease.prerelease ? 'download.release.prerelease' : 'download.release.stable') }}</span>
          </template>
          <span v-else>{{ t(status === 'error' ? 'download.release.error' : status === 'ready' ? 'download.release.noReleases' : 'download.release.loading') }}</span>
        </div>
        <p>{{ t("home.cta.desc") }}</p>
        <div class="cta-actions">
          <UButton
            to="/download"
            size="lg"
            icon="i-lucide-download"
            :label="t('home.cta.button')"
          /><UButton
            to="/download#release-notes"
            size="lg"
            color="neutral"
            variant="ghost"
            icon="i-lucide-file-text"
            :label="t('download.release.notesTitle')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding-block: 24px clamp(64px, 8vw, 96px);
}
.cta-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px);
  text-align: center;
  border: 1px solid var(--ecl-border);
  border-radius: var(--ecl-radius-lg);
  background: var(--ecl-surface);
  box-shadow: var(--ecl-shadow-surface);
  overflow: hidden;
}
/* 卡片顶部的强调色柔光，与 hero 产品图后的光晕呼应 */
.cta-card::before {
  content: "";
  position: absolute;
  inset: -40% -20% auto;
  height: 80%;
  background: radial-gradient(50% 60% at 50% 40%, var(--ecl-glow), transparent 72%);
  pointer-events: none;
}
.cta-card > * {
  position: relative;
  z-index: 1;
}
.cta-card h2 {
  margin: 0;
  font-size: clamp(24px, 2.6vw, 34px);
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.cta-version {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 12px;
  color: var(--ecl-text-tertiary);
  overflow-wrap: anywhere;
}
.cta-tag {
  padding: 2px 10px;
  border: 1px solid var(--ecl-border);
  border-radius: 999px;
  background: var(--ecl-surface-muted);
  color: var(--ecl-text-secondary);
  font-family: var(--font-mono);
  font-size: 12px;
}
.cta-card p {
  max-width: 560px;
  margin-top: 14px;
  color: var(--ecl-text-secondary);
  font-size: 15px;
  line-height: 1.8;
}
.cta-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}
.cta-actions :deep(a) {
  min-height: 44px;
}
@media (max-width: 767px) {
  .cta-actions {
    width: 100%;
    flex-direction: column;
  }
  .cta-actions :deep(a) {
    justify-content: center;
  }
}
</style>
