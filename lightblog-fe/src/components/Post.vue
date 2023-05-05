<script setup lang="ts">
import type { ApiResponse } from '@/types';
import type { ArticleDetailView } from '@/types/Article';
import Http from '@/utils/Http';
import { ElNotification } from 'element-plus';
import { getCurrentInstance, ref, watchEffect } from 'vue';
import Discuss from './Discuss.vue';

const loading = ref(false)
const error = ref(false)
const instance = getCurrentInstance();
const article = ref<ArticleDetailView>();

watchEffect(async () => {
  fetchArticleData();
})

async function fetchArticleData() {
  try{
    loading.value = true
    error.value = false
    const postAliasName = instance?.proxy?.$route?.params?.postAliasName;
    const res = await Http.get<ArticleDetailView>(
      '/getArticleForShow', 
      { params: { postAliasName } 
    })
    article.value = res;
    loading.value = false;
  } catch (err) {
    loading.value = false;
    error.value = true;
    ElNotification({
      title: '错误',
      message: '文章不存在',
      type: 'error',
    })
  }
}
</script>

<template>
  <div v-if="loading">
    <div>
      <div class="flex justify-center items-center h-64">
        <div class="text-2xl text-gray-500">文章不存在</div>
      </div>
    </div>
  </div>
  <div v-else-if="error">
    <div>
      <div class="flex justify-center items-center h-64">
        <div class="text-2xl text-gray-500">文章不存在</div>
      </div>
    </div>
  </div>
  <div v-else-if="article">
    <div class="article-detail p-4 bg-white rounded-lg shadow">
      <div class="article-header">
        <h1 class="text-2xl font-bold">
          {{ article.title }}
        </h1>
      </div>
      <div>
        <span class="text-gray-500">分类: {{ article.category.categoryName }}</span>
        <span class="text-gray-500 ml-4">发布时间: {{ article.updateTime }}</span>
        <span class="text-gray-500 ml-4">阅读量: {{ article.readCount }}</span>
      </div>
      <div class="article-content mt-4" v-html="article.contentHtml">
      </div>
    </div>
    <div>
      <Discuss :articleId="article.articleId" />
    </div>
  </div>
</template>
