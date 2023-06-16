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
const categoryRender = ref(false);
const tagRender = ref(false);

onMounted(async () => {
  if (router.currentRoute.value.path.startsWith('/home/article')) {
    const postAliasName = router.currentRoute.value.params.postAliasName;
    const res = await Http.get<ArticleDetailView>('/getArticleForShow', { params: { postAliasName } })
    article.value = res;
    categoryId.value = res.category.categoryId;
    categoryRender.value = true;
    tagIds.value = res.tags.map(tag => tag.tagId);
    tagRender.value = true;
  }
})
</script>

<template>
  <div class="h-screen overflow-hidden">
    <el-container class="h-full bg-gradient-to-r from-green-300 to-blue-200 flex flex-row">
      <el-aside class="w-ms hidden md:block">
        <Me />
        <el-card class="box-card my-10 mx-4" shadow="hover">
          <Search />
          <Category v-if="categoryRender || router.currentRoute.value.path === '/home'" :categoryId="categoryId" />
          <Tag v-if="tagRender || router.currentRoute.value.path === '/home'" :tagIds="tagIds" />
        </el-card>
      </el-aside>
      <el-main class="flex-grow relative">
        <RouterView v-if="article || router.currentRoute.value.path === '/home'" :article="article" />
      </el-main>
    </el-container>
    <div class="fixed bottom-0 right-0 m-6 md:hidden">
      <router-link to="/home" class="block">
        <button
          class="h-10 w-14 bg-gradient-to-r rounded-lg transition duration-300 ease-in-out transform hover:scale-115 from-blue-400 to-green-400 active:scale-95">
          Home
        </button>
      </router-link>
    </div>
  </div>
</template>