<script setup lang="ts">
import ArticleCard from '@/components/ArticleCard.vue';
import { ref, watch, watchEffect } from 'vue';
import Http from '@/utils/Http';
import type { ArticleListView, QueryAsPageByCategoryAndTags, ArticleCardView, QueryAsPageByKeyword } from '@/types/Article';
import { ElNotification } from 'element-plus';
import router from '@/router';
import tools from '@/utils/tools';

const loading = ref(false);
const error = ref(false);
const empty = ref(false);
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
    // console.log('更新query参数', newQuery);
  }
)

const pagination = ref({
  currentPage: 1,
  pageSize: 7,
  totalItem: 10
});

watchEffect(() => {
  fetchArticleData();
})

async function fetchArticleData() {
  if (keywords.value) {
    paramsOfKeywords.keywords = keywords.value as string;
    await fetchPageDataByKeywords(paramsOfKeywords)
  } else {
    paramsOfCategoryAndTags.categoryId = categoryId.value;
    paramsOfCategoryAndTags.tagIds = tagIds.value.join(',');
    await fetchPageDataByCateoryAndTags(paramsOfCategoryAndTags);
  }
}

async function fetchPageDataByKeywords(params: QueryAsPageByKeyword) {
  try {
    loading.value = true;
    error.value = false;
    empty.value = false;
    const res = await Http.get<ArticleListView>('/searchArticle', { params });
    if (!res) {
      empty.value = true;
      return;
    }
    articles.value = res.list;
    pagination.value = {
      currentPage: res.info.currentPage,
      pageSize: res.info.pageSize,
      totalItem: res.info.totalItem
    };
    loading.value = false;
  } catch (err) {
    loading.value = false;
    empty.value = false;
    error.value = true;
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
    empty.value = false;
    const res = await Http.get<ArticleListView>('/getArticleListByCategoriesAndTagsAsPage', { params });
    if (!res) {
      loading.value = false;
      empty.value = true;
      return;
    }
    articles.value = res.list;
    pagination.value = {
      currentPage: res.info.currentPage,
      pageSize: res.info.pageSize,
      totalItem: res.info.totalItem
    };
    loading.value = false;
  } catch (err) {
    loading.value = false;
    empty.value = false;
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
  <div v-else-if="empty">
    <el-empty description="没有更多文章了..." />
  </div>
  <div v-else-if="error">
    <el-empty description="查询文章列表失败" />
  </div>
  <div v-else>
    <div>
      <!-- <ArticleCard v-for="article in articles" :key="article.articleId" :article="article" /> -->
      <el-card v-for="article in articles" :key="article.articleId" class="box-card mb-10" shadow="hover">
        <div class="flex flex-col">
          <div class="flex flex-row">
            <h2 class="text-xl font-bold ml-10 cursor-pointer">
              <router-link :to="{
                name: 'Article',
                params: { postAliasName: article.postAliasName }
              }" target="_blank">
                文章标题: {{ article.title }}
              </router-link>
            </h2>
            <el-tag class="ml-auto">
              {{ article.category?.categoryName }}
            </el-tag>
          </div>
          <div class="flex flex-row p-2">
            <div class="flex items-center justify-center w-1/2 h-50 bg-cover bg-center"
              :style="{ backgroundImage: `url(${article.previewImageUrl})` }">
            </div>
            <div class="w-1/2 mx-5 mt-5 flex flex-col">
              <div>
                {{ article.summary }}
              </div>
              <div class="mt-auto ml-auto">
                {{ article.updateTime }}
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="flex justify-center">
      <el-pagination class="" layout="prev, pager, next" :total="pagination.totalItem"
        :current-page="pagination.currentPage" :page-size="pagination.pageSize" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>