<script setup lang="ts">
import { LINKS } from '~/constants'

const { t, locale } = useI18n()
const { releases, latestRelease, status, checkedAt, check } = useReleaseDetection()
const selectedTag = ref<string>()
const release = computed(() => releases.value.find(item => item.tag === selectedTag.value) ?? latestRelease.value)
const releaseLabel = computed(() => status.value === 'error' && release.value
  ? 'download.release.savedVersion'
  : release.value && release.value.tag !== latestRelease.value?.tag ? 'download.release.selectedVersion' : 'download.release.latest')
const selectedVersion = computed({
  get: () => release.value?.tag,
  set: (value: string | undefined) => { selectedTag.value = value }
})
const versions = computed(() => releases.value.map(item => ({ label: item.tag, value: item.tag })))
const releaseUrl = computed(() => release.value?.url ?? LINKS.releases)
const dateFormat = computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium', timeZone: 'Asia/Shanghai' }))
const checkedFormat = computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Shanghai' }))
const platforms = [
  { icon: 'i-simple-icons-windows', name: 'Windows', arch: 'x64 / ARM64' },
  { icon: 'i-simple-icons-linux', name: 'Linux', arch: 'x86_64' },
  { icon: 'i-simple-icons-apple', name: 'macOS', arch: 'Apple Silicon / ARM64' },
  { icon: 'i-simple-icons-archlinux', name: 'Arch Linux', arch: 'x86_64' }
]
</script>

<template>
  <div>
    <PageHeader
      :title="t('download.title')"
      :description="t('download.desc')"
    />
    <div class="site-container pb-16 pt-8">
      <EclSurface
        class="release-card"
      >
        <div
          class="release-summary"
          aria-live="polite"
        >
          <span class="eyebrow">{{ t(releaseLabel) }}</span>
          <h2 class="release-version">
            {{ release?.tag ?? t('download.latest.title') }}
          </h2>
          <div
            v-if="release"
            class="release-meta"
          >
            <span class="release-kind">{{ t(release.prerelease ? 'download.release.prerelease' : 'download.release.stable') }}</span>
            <span>{{ t('download.release.published') }} <time :datetime="release.publishedAt">{{ dateFormat.format(new Date(release.publishedAt)) }}</time></span>
          </div>
          <p
            v-else
            class="mt-3 text-sm text-muted"
          >
            {{ t(status === 'ready' ? 'download.release.noReleases' : 'download.latest.desc') }}
          </p>
        </div>
        <div class="release-actions">
          <UButton
            :to="releaseUrl"
            target="_blank"
            size="lg"
            icon="i-lucide-download"
            :label="t(release ? 'download.release.download' : 'download.latest.button')"
          />
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-refresh-cw"
            :loading="status === 'loading'"
            :disabled="status === 'loading'"
            :label="t('download.release.refresh')"
            @click="check(true)"
          />
        </div>
      </EclSurface>
      <div
        class="release-status"
        aria-live="polite"
      >
        <p v-if="status === 'idle' || status === 'loading'">
          {{ t('download.release.loading') }}
        </p>
        <p
          v-else-if="status === 'error'"
          role="alert"
        >
          {{ t(release ? 'download.release.errorCached' : 'download.release.error') }}
        </p>
        <p v-else-if="checkedAt">
          {{ t('download.release.checked') }} {{ checkedFormat.format(new Date(checkedAt)) }}
        </p>
        <USelect
          v-if="versions.length > 1"
          v-model="selectedVersion"
          :items="versions"
          color="neutral"
          class="version-select"
          :aria-label="t('download.release.select')"
        />
      </div>

      <section
        id="release-notes"
        class="release-notes-section"
        :aria-label="t('download.release.notesTitle')"
      >
        <div class="notes-heading">
          <h2 class="text-lg font-semibold">
            {{ t('download.release.notesTitle') }}
          </h2>
          <a
            :href="releaseUrl"
            target="_blank"
            rel="noopener"
            class="text-sm ecl-link"
          >{{ t('download.release.source') }} <UIcon
            name="i-lucide-arrow-up-right"
            class="size-3.5"
          /></a>
        </div>
        <ReleaseNotes
          v-if="release?.notes"
          :source="release.notes"
        />
        <p
          v-else
          class="notes-empty text-sm text-muted"
          aria-live="polite"
        >
          {{ t(release ? 'download.release.noNotes' : status === 'error' ? 'download.release.notesUnavailable' : status === 'ready' ? 'download.release.noReleases' : 'download.release.loading') }}
        </p>
      </section>

      <section class="mt-10">
        <h2 class="text-lg font-semibold">
          {{ t("download.platforms") }}
        </h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            v-for="platform in platforms"
            :key="platform.name"
            :href="releaseUrl"
            target="_blank"
            rel="noopener"
            class="ecl-surface ecl-surface--classic ecl-surface--interactive p-6"
          >
            <UIcon
              :name="platform.icon"
              class="size-7 ecl-link"
            />
            <p class="mt-3 font-semibold">{{ platform.name }}</p>
            <p class="mt-2 text-xs font-mono text-muted">{{ platform.arch }}</p>
            <p class="mt-2 flex items-center gap-2 text-xs text-muted">
              {{ t("download.install.notes") }}<UIcon name="i-lucide-arrow-up-right" />
            </p>
          </a>
        </div>
        <p class="mt-4 text-sm text-muted">
          {{ t("download.platformNote") }}
        </p>
      </section>
      <div class="mt-10 grid gap-6 lg:grid-cols-2">
        <EclSurface
          v-reveal
          class="p-6"
        >
          <h2 class="text-lg font-semibold">
            {{ t("download.install.title") }}
          </h2>
          <ol class="mt-4 list-decimal space-y-3 pl-5 text-sm text-muted">
            <li
              v-for="index in 3"
              :key="index"
            >
              {{ t(`download.install.steps.${index - 1}`) }}
            </li>
          </ol>
          <div class="section-actions">
            <UButton
              to="/docs"
              color="neutral"
              variant="outline"
              icon="i-lucide-book-open"
              :label="t('download.install.docs')"
            /><UButton
              :to="releaseUrl"
              target="_blank"
              color="neutral"
              variant="ghost"
              :label="t('download.install.notes')"
            />
          </div>
        </EclSurface>
        <EclSurface
          v-reveal
          class="p-6"
        >
          <h2 class="text-lg font-semibold">
            {{ t("download.update.title") }}
          </h2>
          <p class="mt-4 text-sm leading-7 text-muted">
            {{ t("download.update.desc") }}
          </p>
        </EclSurface>
      </div>
      <p class="mt-8 text-xs leading-6 text-muted">
        {{ t("disclaimer") }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.release-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  border-radius: 12px;
}
.release-summary { min-width: 0; }
.release-version { font-size: clamp(22px, 2.2vw, 28px); font-weight: 600; overflow-wrap: anywhere; }
.release-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 12px; font-size: 13px; color: var(--ecl-text-secondary); }
.release-kind { color: var(--ecl-link); }
.release-actions { display: flex; flex-wrap: wrap; gap: 8px; flex-shrink: 0; }
.release-status { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-top: 16px; color: var(--ecl-text-secondary); font-size: 13px; }
.version-select { width: min(100%, 320px); }
.release-notes-section { margin-top: 32px; padding: 24px; border: 1px solid var(--ecl-border); border-radius: 8px; background: var(--ecl-surface); scroll-margin-top: 96px; }
.notes-heading { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
.notes-empty { line-height: 1.8; }
@media (max-width: 767px) {
  .release-card {
    align-items: flex-start;
    flex-direction: column;
    padding: 24px;
  }
}
</style>
