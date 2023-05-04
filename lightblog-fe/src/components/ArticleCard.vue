<script setup lang="ts">
import type { ArticleCardView } from '@/types/Article';

const props = defineProps<{ article: ArticleCardView }>();

</script>

<template>
  <el-card class="box-card mb-10" shadow="hover">
    <div class="flex flex-col">
      <div class="flex flex-row">
        <h2 class="text-xl font-bold ml-10 cursor-pointer">
          <router-link :to="{
            name: 'Article',
            params: { postAliasName: article.postAliasName }
          }">
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
</template>