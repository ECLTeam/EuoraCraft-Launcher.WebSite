<script setup lang="ts">
const { t } = useI18n()
const { latestRelease, status } = useReleaseDetection()
</script>

<template>
  <section
    id="home-download"
    class="site-container download-section"
    :aria-label="t('home.cta.title')"
  >
    <div class="download-copy">
      <h2>
        {{ t("home.cta.title") }}
      </h2>
      <div
        class="download-version"
        aria-live="polite"
      >
        <template v-if="latestRelease">
          <span>{{ t(status === 'error' ? 'download.release.savedVersion' : 'download.release.latest') }} {{ latestRelease.tag }}</span>
          <span>{{ t(latestRelease.prerelease ? 'download.release.prerelease' : 'download.release.stable') }}</span>
        </template>
        <span v-else>{{ t(status === 'error' ? 'download.release.error' : status === 'ready' ? 'download.release.noReleases' : 'download.release.loading') }}</span>
      </div>
      <p>
        {{ t("home.cta.desc") }}
      </p>
    </div>
    <div class="download-actions">
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
  </section>
</template>

<style scoped>
.download-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 40px;
  padding-block: 44px 56px;
  border-top: 1px solid var(--ecl-border);
}
.download-copy h2 {
  font-size: clamp(24px, 2.1vw, 30px);
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.download-copy p {
  margin-top: 12px;
  max-width: 640px;
  color: var(--ecl-text-secondary);
  font-size: 14px;
  line-height: 1.85;
}
.download-version {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  font-size: 12px;
  color: var(--ecl-text-tertiary);
  overflow-wrap: anywhere;
}
.download-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.download-actions :deep(a) {
  min-height: 44px;
}
@media (max-width: 1023px) {
  .download-section {
    grid-template-columns: 1fr;
    gap: 24px;
    padding-block: 32px 40px;
  }
}
</style>
