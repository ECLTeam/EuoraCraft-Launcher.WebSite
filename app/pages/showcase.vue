<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <PageHeader
      :title="t('showcase.title')"
      :description="t('showcase.desc')"
    />

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ShowcaseFrame />
    </div>
  </div>
</template>
