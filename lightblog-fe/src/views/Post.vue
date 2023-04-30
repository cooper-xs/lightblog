<template>
  <div class="article-detail p-4 bg-white rounded-lg shadow">
    <div class="article-header">
      <h1 class="text-2xl font-bold">{{ article?.title }}</h1>
      <div class="article-meta flex items-center mt-2 text-gray-500">
        <span class="mr-4">分类：{{ article?.category?.categoryName }}</span>
        <span class="mr-4">标签：
          <el-tag v-for="tag in article?.tags" :key="tag.tagId">{{ tag.tagName }}</el-tag>
        </span>
        <span class="mr-4">发布时间：{{ article?.updateTime }}</span>
        <span class="mr-4">阅读量：{{ article?.readCount }}</span>
        <span>评论数：{{ article?.commentCount }}</span>
      </div>
    </div>
    <div class="article-content mt-4" v-html="article?.contentHtml"></div>
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from '@/types';
import type { ArticleDetailView } from '@/types/Article';
import Http from '@/utils/Http';
import { getCurrentInstance, onMounted, ref } from 'vue';

const instance = getCurrentInstance();
const article = ref<ArticleDetailView>();

onMounted(async () => {
  fetchArticleData();
})

async function fetchArticleData() {
  const articleId = instance?.proxy?.$route?.params?.articleId;

  return await Http.get('/article/show/' + articleId)
    .then(res => {
      const response = res.data as ApiResponse<ArticleDetailView>;
      console.log(response.data);
      article.value = response.data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}
</script>
<!-- 
<style scoped>
.article-header {
  margin-bottom: 20px;

  h1 {
    font-size: 32px;
    margin-bottom: 10px;
    line-height: 1.2;
  }

  .article-meta {
    margin-top: 10px;
    color: #999;
    font-size: 14px;

    span:not(:first-child) {
      margin-left: 10px;
    }
  }
}

.article-content {
  margin-top: 20px;
  font-size: 18px;
  line-height: 1.8;

  img {
    max-width: 100%;
  }

  p {
    margin-bottom: 10px;
  }

  a {
    color: #4c51bf;
    text-decoration: underline;
  }

  pre {
    padding: 10px;
    background-color: #f7fafc;
    border-radius: 4px;
    overflow-x: auto;
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 400;
  }

  blockquote {
    margin: 0;
    padding: 10px;
    background-color: #f3f3f3;
    border-left: 4px solid #ddd;
    color: #555;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f3f3f3;
      text-align: left;
    }
  }
}
</style> -->