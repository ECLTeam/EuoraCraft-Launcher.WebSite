<script setup lang="ts">
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps<{ source: string }>()
const renderer = new marked.Renderer()
renderer.heading = function ({ tokens, depth }) {
  const level = Math.min(6, depth + 2)
  return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>`
}
const body = computed(() => DOMPurify.sanitize(marked.parse(props.source, { async: false, renderer }), {
  ALLOWED_TAGS: ['p', 'br', 'hr', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'del', 'blockquote', 'code', 'pre', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
  ALLOWED_ATTR: ['href', 'title', 'start']
}))
</script>

<template>
  <!-- Release HTML passes through DOMPurify's tag and attribute allowlist above. -->
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="release-notes-body md-body"
    v-html="body"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<style scoped>
.release-notes-body {
  overflow-wrap: anywhere;
}
.release-notes-body :deep(h1),
.release-notes-body :deep(h2),
.release-notes-body :deep(h3),
.release-notes-body :deep(h4) {
  margin-block: 24px 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--ecl-text);
}
.release-notes-body :deep(:first-child) {
  margin-top: 0;
}
.release-notes-body :deep(pre) {
  padding: 12px;
  border: 1px solid var(--ecl-border);
  border-radius: 6px;
  overflow-x: auto;
  background: var(--ecl-surface-muted);
}
.release-notes-body :deep(table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
}
.release-notes-body :deep(th),
.release-notes-body :deep(td) {
  padding: 8px 12px;
  border: 1px solid var(--ecl-border);
}
.release-notes-body :deep(a) {
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
