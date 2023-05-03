<script setup lang="ts">
import type { ApiResponse } from '@/types';
import type { ArticleDetailView } from '@/types/Article';
import Http from '@/utils/Http';
import { getCurrentInstance, onMounted, ref } from 'vue';
import Discuss from './Discuss.vue';

const instance = getCurrentInstance();
const article = ref<ArticleDetailView>();

onMounted(async () => {
  fetchArticleData();
})

async function fetchArticleData() {
  const postAliasName = instance?.proxy?.$route?.params?.postAliasName;

  return await Http.get('/getArticleForShow', { params: { postAliasName } })
    .then(res => {
      const response = res.data as ApiResponse<ArticleDetailView>;
      article.value = response.data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}
</script>

<template>
  <div class="article-detail p-4 bg-white rounded-lg shadow">
    <div class="article-header">
      <h1 class="text-2xl font-bold">
        {{ article?.title }}
      </h1>
    </div>
    <div>
      <span class="text-gray-500">分类: {{ article?.category.categoryName }}</span>
      <span class="text-gray-500 ml-4">发布时间: {{ article?.updateTime }}</span>
      <span class="text-gray-500 ml-4">阅读量: {{ article?.readCount }}</span>
    </div>
    <div class="article-content mt-4" v-html="article?.contentHtml">
    </div>
  </div>
  <div>
    <Discuss :articleId="article?.articleId ?? 1" />
  </div>
</template>
