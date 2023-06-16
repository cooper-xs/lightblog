<template>
  <div ref="content" class="article-content mt-4" v-html="contentHtml"></div>
</template>

<script setup lang="ts">
import type { ArticleDetailView } from '@/types/Article'
import { computed } from 'vue';
import '@/assets/fonts/stylesheet.css'

const props = defineProps({
  article: {
    type: Object as () => ArticleDetailView,
    required: true
  }
})

const contentHtml = computed(() => {
  return props.article.contentHtml
})
</script>

<style lang="less" scoped>
.article-content {
  :deep(pre) {
    font-family: 'Fira Code';
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
    line-height: 1.5;
    background-color: #777;
    color: #fff;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
  }

  :deep(pre) code {
    font-family: 'Fira Code';
    font-weight: normal;
    font-style: normal;
    display: block;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
  }

  :deep(table) {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    margin-bottom: 1.5rem;
    border: 1px solid #ebedf0;
    border-radius: 5px;
  }

  :deep(table) th {
    font-weight: 600;
    padding: 0.75rem;
    vertical-align: bottom;
    border-bottom: 2px solid #ebedf0;
  }

  :deep(table) td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #ebedf0;
  }

  :deep(table) tr:nth-child(2n) {
    background-color: #fafafa;
  }

  :deep(table) tr:hover {
    background-color: #f5f5f5;
  }

  :deep(p) {
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  :deep(h1) {
    font-size: 2.25rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  :deep(h2) {
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  :deep(h3) {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  :deep(h4) {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  :deep(h5) {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  :deep(h6) {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  :deep(blockquote) {
    margin-bottom: 1.5rem;
    padding: 0.75rem 1rem;
    color: #777;
    border-left: 0.25rem solid #ebedf0;
    margin-inline-start: 20px;
    margin-inline-end: 20px;
  }

  :deep(blockquote) :deep(p:last-child) {
    margin-bottom: 0;
  }

  :deep(ul) {
    margin-bottom: 1.5rem;
  }

  :deep(ol) {
    margin-bottom: 1.5rem;
    padding-inline-start: 25px;
  }

  :deep(ul) :deep(li) {
    margin-bottom: 0.75rem;
  }

  :deep(ol) :deep(li) {
    margin-bottom: 0.75rem;
  }


}
</style>