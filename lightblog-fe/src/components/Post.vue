<template>
  <div class="article-detail p-4 bg-white rounded-lg shadow">
    <div class="article-header">
      <h1 class="text-2xl font-bold">
        {{ article?.title }}
      </h1>
    </div>
    <div class="article-content mt-4" v-html="article?.contentHtml">
    </div>
  </div>
  <div>
    <Discuss />
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from '@/types';
import type { ArticleDetailView } from '@/types/Article';
import Http from '@/utils/Http';
import { getCurrentInstance, onMounted, ref } from 'vue';
import Discuss from './Discuss.vue';

const instance = getCurrentInstance();
const article = ref<ArticleDetailView>();

onMounted(async () => {
  console.log('文章详情页');
  fetchArticleData();
})

async function fetchArticleData() {
  const postAliasName = instance?.proxy?.$route?.params?.postAliasName;

  return await Http.get('/getArticleForShow', { params: { postAliasName } })
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
