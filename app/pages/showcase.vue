<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <PageHeader
      :title="t('showcase.title')"
      :description="t('showcase.desc')"
    />

    <div class="site-container pb-16 pt-8">
      <ShowcaseFrame />
    </div>
  </div>
</template>
