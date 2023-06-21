<template>
  <div class="flex flex-col justify-center items-center">
    <el-card v-for="articleItem in articles" :key="articleItem.articleId" class="my-4 w-3/4">
      <RouterLink :to="{
        name: 'UpdateArticle',
        query: {
          articleId: articleItem.articleId
        }
      }">
        <h1 class="font-bold">
          {{ articleItem.title }}
        </h1>
        <h2>
          {{ articleItem.summary }}
        </h2>
      </RouterLink>
    </el-card>
    <el-pagination class="" layout="prev, pager, next" :total="pagination.totalItem"
      :current-page="pagination.currentPage" :page-size="pagination.pageSize" background @current-change="handleCurrentChange"/>
  </div>
</template>

<script setup lang="ts">
import type { ArticleCardView, ArticleListView } from '@/types/Article';
import Http from '@/utils/Http';
import { onMounted, ref } from 'vue';

const loading = ref(false);
const error = ref(false);
const articles = ref<ArticleCardView[]>([]);
const pagination = ref({
  currentPage: 1,
  pageSize: 7,
  totalItem: 10
});

onMounted(async () => {
  await fetchPageDataByCateoryAndTags({ page: 1 });
})

async function fetchPageDataByCateoryAndTags(params: { page: number }) {
  const res = await Http.get<ArticleListView>('/getArticleListByCategoriesAndTagsAsPage', { params });
  if (!res) {
    error.value = true;
    return;
  }
  articles.value = res.list;
  pagination.value = {
    currentPage: res.info.currentPage,
    pageSize: res.info.pageSize,
    totalItem: res.info.totalItem
  };
}

function handleCurrentChange(page: number) {
  fetchPageDataByCateoryAndTags({ page });
}
</script>