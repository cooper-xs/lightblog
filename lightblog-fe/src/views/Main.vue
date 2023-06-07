<script setup lang="ts">
import { RouterView } from 'vue-router'
import Me from '@/components/Me.vue';
import Search from '@/components/Search.vue';
import Category from '@/components/Category.vue';
import Tag from '@/components/Tag.vue';
import { onMounted, ref, watchEffect } from 'vue';
import router from '@/router';
import Http from '@/utils/Http';
import type { ArticleDetailView } from '@/types/Article';

const article = ref<ArticleDetailView>();
const categoryId = ref(0);
const tagIds = ref([] as number[]);

onMounted(async () => {
  if (router.currentRoute.value.path.startsWith('/home/article')) {
    const postAliasName = router.currentRoute.value.params.postAliasName;
    const res = await Http.get<ArticleDetailView>('/getArticleForShow', { params: { postAliasName } })
    article.value = res;
    categoryId.value = res.category.categoryId;
    tagIds.value = res.tags.map(tag => tag.tagId);
  }
})
</script>

<template>
  <!-- <div
    class="flex justify-center items-center absolute w-4/5 mt-15 mb-30 min-w-2xl mx-auto left-1/2 transform -translate-x-1/2"> -->
    <el-container>
      <el-aside class="w-ms bg-teal-50">
        <Me />
        <el-card class="box-card my-10 mx-4" shadow="hover">
          <Search />
          <Category v-if="categoryId || router.currentRoute.value.path === '/home'" :categoryId="categoryId" />
          <Tag v-if="tagIds.length > 0 || router.currentRoute.value.path === '/home'" :tagIds="tagIds" />
        </el-card>
      </el-aside>
      <el-main class="bg-blue-50 p-5">
        <RouterView v-if="article || router.currentRoute.value.path === '/home'" :article="article" />
      </el-main>
    </el-container>
  <!-- </div> -->
</template> 