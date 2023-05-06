<script setup lang="ts">
import router from '@/router';
import Http from '@/utils/Http';
import { ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';
import Discuss from './Discuss.vue';
import type { ArticleDetailView } from '@/types/Article';

const loading = ref(false)
const error = ref(false)
const article = ref<ArticleDetailView>();

onMounted(async () => {
  const postAliasName = router.currentRoute.value.params.postAliasName;
  await fetchArticleData(postAliasName);
  // 根据文章的标签和分类修改Category和Tag组件的选中状态, 但不修改路由
  const category = article.value?.category;
  const tags = article.value?.tags;
  
});

async function fetchArticleData(postAliasName: string | string[]) {
  try {
    loading.value = true
    error.value = false
    const res = await Http.get<ArticleDetailView>('/getArticleForShow', { params: { postAliasName } })
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
      <el-empty description="正在加载中..." />
    </div>
  </div>
  <div v-else-if="error">
    <div>
      <el-empty description="文章不存在" />
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
