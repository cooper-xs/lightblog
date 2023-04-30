<template>
  <div>
    <ArticleCard v-for="article in articles" :key="article.articleId" :article="article" />
  </div>
  <div class="flex justify-center">
    <el-pagination class="" layout="prev, pager, next" :total="pagination.totalItem"
      :current-page="pagination.currentPage" :page-size="pagination.pageSize" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import ArticleCard from '@/components/ArticleCard.vue';
import { onMounted, ref } from 'vue';
import Http from '@/utils/Http';
import type { ArticleListView, QueryAsPageByCategoryAndTags, ArticleCardView } from '@/types/Article';
import type { ApiResponse } from '@/types';

const params: QueryAsPageByCategoryAndTags = {};

const pagination = ref({
  currentPage: 1,
  pageSize: 7,
  totalItem: 10
});

const articles = ref<ArticleCardView[]>([]);

onMounted(async () => {
  fetchPageData(params);
});

async function fetchPageData(params: QueryAsPageByCategoryAndTags) {
  return await Http.get('/article/show/list', { params })
    .then(res => {
      const response = res.data as ApiResponse<ArticleListView>;
      console.log(response.data?.info);
      // 设置文章信息
      articles.value = response.data?.list ?? [];
      // 设置分页信息
      pagination.value = {
        currentPage: response.data?.info.currentPage ?? 2,
        pageSize: response.data?.info.pageSize ?? 5,
        totalItem: response.data?.info.totalItem ?? 5
      };

      console.log('文章信息: ', articles.value);
      console.log('分页信息: ', pagination.value);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}

function handleCurrentChange(page: number) {
  fetchPageData({ ...params, page });
}
</script>
