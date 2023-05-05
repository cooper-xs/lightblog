<script setup lang="ts">
import ArticleCard from '@/components/ArticleCard.vue';
import { onMounted, ref, watch, watchEffect } from 'vue';
import Http from '@/utils/Http';
import type { ArticleListView, QueryAsPageByCategoryAndTags, ArticleCardView, QueryAsPageByKeyword } from '@/types/Article';
import { ElNotification } from 'element-plus';
import router from '@/router';


const loading = ref(false);
const error = ref(false);
const keywords = ref('');
const categoryId = ref(0);
const tagIds = ref([] as number[]);
const articles = ref<ArticleCardView[]>([]);
const paramsOfCategoryAndTags: QueryAsPageByCategoryAndTags = {};
const paramsOfKeywords: QueryAsPageByKeyword = { keywords: '' };

watch(
  () => router.currentRoute.value.query,
  (newQuery) => {
    keywords.value = newQuery.keywords as string;
    categoryId.value = Number(newQuery.categoryId);
    tagIds.value = newQuery.tagIds ? (newQuery.tagIds as string).split(',').map(Number) : [];
    console.log('更新query参数', newQuery);
  }
)

const pagination = ref({
  currentPage: 1,
  pageSize: 7,
  totalItem: 10
});

// 在初次渲染后 或者 query参数变化后，获取文章列表
watchEffect(() => {
  keywords.value = router.currentRoute.value.query.keywords as string;
  categoryId.value = Number(router.currentRoute.value.query.categoryId);
  tagIds.value = router.currentRoute.value.query.tagIds ? (router.currentRoute.value.query.tagIds as string).split(',').map(Number) : [];
  fetchArticleData();
})

async function fetchArticleData() {
  if (keywords.value) {
    paramsOfKeywords.keywords = keywords.value as string;
    console.log('关键词获取文章');
    fetchPageDataByKeywords(paramsOfKeywords)
  } else {
    console.log('分类和标签获取文章');
    paramsOfCategoryAndTags.categoryId = categoryId.value;
    paramsOfCategoryAndTags.tagIds = tagIds.value;
    fetchPageDataByCateoryAndTags(paramsOfCategoryAndTags);
  }
}

async function fetchPageDataByKeywords(params: QueryAsPageByKeyword) {
  try {
    loading.value = true;
    error.value = false;
    console.log('params', params);
    const res = await Http.get<ArticleListView>('/searchArticle', { params });
    articles.value = res.list;
    pagination.value = {
      currentPage: res.info.currentPage,
      pageSize: res.info.pageSize,
      totalItem: res.info.totalItem
    };
    loading.value = false;
  } catch (err) {
    loading.value = false;
    error.value = true;
    console.log('err', err);
    ElNotification({
      title: '错误',
      message: '关键字查询失败',
      type: 'error',
    })
  }
}

async function fetchPageDataByCateoryAndTags(params: QueryAsPageByCategoryAndTags) {
  try {
    loading.value = true;
    error.value = false;
    const res = await Http.get<ArticleListView>('/getArticleListByCategoriesAndTagsAsPage', { params });
    articles.value = res.list;
    pagination.value = {
      currentPage: res.info.currentPage,
      pageSize: res.info.pageSize,
      totalItem: res.info.totalItem
    };
    loading.value = false;
  } catch(err) {
    loading.value = false;
    error.value = true;
    ElNotification({
      title: '错误',
      message: '查询文章列表失败',
      type: 'error',
    })
  }
}

function handleCurrentChange(page: number) {
  fetchPageDataByCateoryAndTags({ ...paramsOfCategoryAndTags, page });
}
</script>

<template>
  <div v-if="loading">
    <el-empty description="文章列表加载中..." />
  </div>
  <div v-else-if="error">
    <el-empty description="文章列表加载失败" />
  </div>
  <div v-else>
    <ElCard v-if="keywords" class="mb-5 mx-30" shadow="never">
      <div class="text-center">
        <h1 class="text-2xl font-bold">关键词: {{ keywords }}</h1>
      </div>
    </ElCard>
    <div>
      <ArticleCard v-for="article in articles" :key="article.articleId" :article="article" />
    </div>
    <div class="flex justify-center">
      <el-pagination class="" layout="prev, pager, next" :total="pagination.totalItem"
        :current-page="pagination.currentPage" :page-size="pagination.pageSize" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>