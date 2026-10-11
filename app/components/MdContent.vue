<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

// Parse repository-owned Markdown during SSR and client-side language changes.
const props = defineProps<{ source: string }>()

const body = computed(() => marked.parse(props.source) as string)
</script>

<template>
  <div
    class="md-body"
    v-html="body"
  />
</template>
