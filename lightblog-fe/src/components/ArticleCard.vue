<template>
  <div class="flex flex-col p-2">
    <div class="flex flex-row">
      <h2 class="text-xl font-bold ml-10 cursor-pointer">
        <router-link :to="{
            name: 'Post', 
            params: {articleId: article.articleId}, 
            query: {postAlaisName: article.postAliasName}
          }">
          {{ article.title }}
        </router-link>
      </h2>
      <div class="ml-auto">
        {{ article.category?.categoryName }}
      </div>
    </div>
    <div class="flex flex-row p-2">
      <div class="w-1/2 h-50 flex items-center justify-center overflow-hidden">
        <div class="aspect-h-1 aspect-w-1 object-center" >
          <img :src="article.previewImageUrl" alt="" class="w-full h-full object-cover" />
        </div>
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

</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue';
import type { ArticleCardView } from '@/types/Article';

const props = defineProps<{ article: ArticleCardView }>();

onMounted(() => {
  console.log(props.article);
});

// const instance = getCurrentInstance();

// function viewArticle () {
//   instance!.appContext.config.globalProperties.$router.push({ path: `/${props.article.postAliasName}` });
// }
</script>
