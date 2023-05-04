<script setup lang="ts">
import ArticleCard from '@/components/ArticleCard.vue';
import { computed, onMounted, ref, watchEffect } from 'vue';
import Http from '@/utils/Http';
import type { ArticleListView, QueryAsPageByCategoryAndTags, ArticleCardView, QueryAsPageByKeyword } from '@/types/Article';
import type { ApiResponse } from '@/types';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import router from '@/router';

const getKeywords = (route: RouteLocationNormalizedLoaded) => {
  return route.query.keywords;
};
const getCategoryId = (route: RouteLocationNormalizedLoaded) => {
  return Number(route.params.categoryId);
};
const getTagId = (route: RouteLocationNormalizedLoaded) => {
  return Number(route.params.tagId);
};

const keywords = computed(() => getKeywords(router.currentRoute.value));


const paramsOfCategoryAndTags: QueryAsPageByCategoryAndTags = {};
const paramsOfKeywords: QueryAsPageByKeyword = { keywords: '' };

const pagination = ref({
  currentPage: 1,
  pageSize: 7,
  totalItem: 10
});

const categoryId = ref(getCategoryId(router.currentRoute.value));

const articles = ref<ArticleCardView[]>([]);

watchEffect(async () => {
  // 如果有keywords参数, 则按照keywords搜索
  if (keywords.value) {
    paramsOfKeywords.keywords = keywords.value as string;
    fetchPageDataByKeywords(paramsOfKeywords)
  } else {
    fetchPageDataByCateoryAndTags(paramsOfCategoryAndTags);
  }
});

async function fetchPageDataByKeywords(params: QueryAsPageByKeyword) {
  return await Http.get('/searchArticle', { params })
    .then(res => {
      const response = res.data as ApiResponse<ArticleListView>;
      // 设置文章信息
      articles.value = response.data?.list ?? [];
      // 设置分页信息
      pagination.value = {
        currentPage: response.data?.info.currentPage ?? 1,
        pageSize: response.data?.info.pageSize ?? 7,
        totalItem: response.data?.info.totalItem ?? 10
      };
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}

async function fetchPageDataByCateoryAndTags(params: QueryAsPageByCategoryAndTags) {
  params.categoryId = categoryId.value;
  return await Http.get('/getArticleListByCategoriesAndTagsAsPage', { params })
    .then(res => {
      const response = res.data as ApiResponse<ArticleListView>;
      // 设置文章信息
      articles.value = response.data?.list ?? [];
      // 设置分页信息
      pagination.value = {
        currentPage: response.data?.info.currentPage ?? 1,
        pageSize: response.data?.info.pageSize ?? 7,
        totalItem: response.data?.info.totalItem ?? 10
      };
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}

function handleCurrentChange(page: number) {
  fetchPageDataByCateoryAndTags({ ...paramsOfCategoryAndTags, page });
}
</script>

<template>
  <ElCard v-if="keywords" class="mb-5 mx-30" shadow="never">
    <div class="text-center">
      <h1 class="text-2xl font-bold">关键词: {{ keywords }}</h1>
    </div>
  </ElCard>
  <ElCard v-else-if="categoryId" class="mb-5 mx-30" shadow="never">
    <div class="text-center">
      <h1 class="text-2xl font-bold">分类: {{ articles[0].category.categoryName }}</h1>
    </div>
  </ElCard>
  <div>
    <ArticleCard v-for="article in articles" :key="article.articleId" :article="article" />
  </div>
  <div class="flex justify-center">
    <el-pagination class="" layout="prev, pager, next" :total="pagination.totalItem"
      :current-page="pagination.currentPage" :page-size="pagination.pageSize" @current-change="handleCurrentChange" />
  </div>
</template>