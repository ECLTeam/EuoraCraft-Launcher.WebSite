<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

// 接收 markdown 源文本，客户端渲染为 HTML。
// 官网为纯客户端静态站，故用 marked 在浏览器内联解析，而非依赖服务端渲染。
const props = defineProps<{ source: string }>()

const body = computed(() => marked.parse(props.source) as string)
</script>

<template>
  <div
    v-html="body"
    class="md-body"
  />
</template>