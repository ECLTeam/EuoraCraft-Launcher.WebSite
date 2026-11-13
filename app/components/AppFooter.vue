<script setup lang="ts">
import { BRAND, LICENSE, LINKS } from '~/constants'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const now = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-container footer-inner">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <div class="flex items-center gap-2.5">
            <img
              src="/favicon.ico"
              :alt="BRAND.name"
              class="size-8 shrink-0 rounded-lg"
            >
            <span class="font-semibold">{{ BRAND.name }}</span>
          </div>
          <p class="mt-3 max-w-xs text-sm text-muted">
            {{ t("brand.tagline") }}
          </p>
          <div class="mt-4 flex items-center gap-1">
            <UButton
              :to="LINKS.repo"
              target="_blank"
              icon="i-simple-icons-github"
              :aria-label="t('home.opensource.github')"
              color="neutral"
              variant="ghost"
            />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold">
            {{ t("footer.nav") }}
          </h3>
          <nav class="mt-3 flex flex-col items-start gap-2 text-sm text-muted">
            <NuxtLink
              :to="localePath('/')"
              class="hover:text-(--ui-primary)"
            >{{
              t("nav.home")
            }}</NuxtLink>
            <NuxtLink
              :to="localePath('/features')"
              class="hover:text-(--ui-primary)"
            >{{
              t("nav.features")
            }}</NuxtLink>
            <NuxtLink
              :to="localePath('/download')"
              class="hover:text-(--ui-primary)"
            >{{
              t("nav.download")
            }}</NuxtLink>
            <NuxtLink
              :to="localePath('/docs')"
              class="hover:text-(--ui-primary)"
            >{{
              t("nav.docs")
            }}</NuxtLink>
            <NuxtLink
              :to="localePath('/showcase')"
              class="hover:text-(--ui-primary)"
            >{{
              t("nav.showcase")
            }}</NuxtLink>
            <NuxtLink
              :to="localePath('/about')"
              class="hover:text-(--ui-primary)"
            >{{
              t("nav.about")
            }}</NuxtLink>
          </nav>
        </div>

        <div>
          <h3 class="text-sm font-semibold">
            {{ t("footer.project") }}
          </h3>
          <nav class="mt-3 flex flex-col items-start gap-2 text-sm text-muted">
            <a
              :href="LINKS.repo"
              target="_blank"
              rel="noopener"
              class="hover:text-(--ui-primary)"
            >{{ t("footer.repo") }}</a>
            <a
              :href="LINKS.releases"
              target="_blank"
              rel="noopener"
              class="hover:text-(--ui-primary)"
            >{{ t("footer.releases") }}</a>
            <a
              :href="locale === 'en-US' ? LINKS.docsEn : LINKS.docs"
              target="_blank"
              rel="noopener"
              class="hover:text-(--ui-primary)"
            >{{ t("footer.docs") }}</a>
            <a
              :href="LINKS.issues"
              target="_blank"
              rel="noopener"
              class="hover:text-(--ui-primary)"
            >{{ t("footer.issues") }}</a>
          </nav>
        </div>
      </div>

      <div class="footer-legal">
        <p class="text-xs text-muted">
          © {{ now }} {{ BRAND.org }} ·
          {{
            t("footer.copyright", {
              license: LICENSE.code,
              images: LICENSE.images
            })
          }}
        </p>
        <p class="mt-2 text-xs text-muted">
          {{ t("disclaimer") }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 扁平页脚：画布色 + 一条顶部分隔线，不用色带背景 */
.site-footer {
  border-top: 1px solid var(--ecl-border);
}
.footer-inner {
  padding-block: 48px 40px;
}
.footer-legal {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--ecl-divider);
}
.site-footer a {
  min-height: 28px;
}
@media (max-width: 767px) {
  .site-footer a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
}
</style>
