<script setup lang="ts">
import { ref } from 'vue';
import Discuss from './Discuss.vue';
import type { ArticleDetailView } from '@/types/Article';
import ArticleContent from './ArticleContent.vue';

const props = defineProps({
  article: {
    type: Object as () => ArticleDetailView,
    required: true
  }
});

const loading = ref(false)
const error = ref(false)
</script>

<template>
  <div v-if="loading">
    <div>
      <el-empty description="正在加载中..." />
    </div>
  </div>
  <div v-else-if="error">
    <div>
      <el-empty description="文章不存在" />
    </div>
  </div>
  <div v-else-if="props.article">
    <div class="article-detail py-10 px-30 bg-white rounded-lg shadow">
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
