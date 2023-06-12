<script setup lang="ts">
import { onMounted } from 'vue';
import Discuss from './Discuss.vue';
import type { ArticleDetailView } from '@/types/Article';
import ArticleContent from './ArticleContent.vue';

const props = defineProps({
  article: {
    type: Object as () => ArticleDetailView,
    required: true
  }
});

// 设置标签页标题
onMounted(() => {
  document.title = props.article.title + ' | Light Blog';
})
</script>

<template>
  <div v-if="props.article" class="">
    <div class="article-detail p-5 bg-white rounded-lg shadow">
      <div class="article-header">
        <h1 class="text-2xl font-bold">
          {{ props.article.title }}
        </h1>
      </div>
      <div>
        <span class="text-gray-500">分类: {{ props.article.category.categoryName }}</span>
        <span class="text-gray-500 ml-4">发布时间: {{ props.article.updateTime }}</span>
        <span class="text-gray-500 ml-4">阅读量: {{ props.article.readCount }}</span>
      </div>
      <ArticleContent :article="props.article" />
    </div>
    <div>
      <Discuss :articleId="article.articleId" />
    </div>
  </div>
</template>
