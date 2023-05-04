<script setup lang="ts">
import type { ApiResponse } from '@/types';
import type { CategoryFamily, ViewCategory } from '@/types/category';
import Http from '@/utils/Http';
import { onMounted, ref } from 'vue';

const categories = ref<ViewCategory[]>([]);

onMounted(() => {
  fetchCategoryAll();
});

async function fetchCategoryAll(){
  return await Http.get('/getCategoryList')
    .then(res => {
      const response = res.data as ApiResponse<CategoryFamily>;
      // 设置文章信息
      categories.value = response.data?.children ?? [];
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}
</script>

<template>
  <div class="flex flex-wrap gap-2 my-2">
    <el-tag v-for="category in categories" :key="category.categoryId" class="mx-1" round>
      <router-link :to="{ 
        name: 'Category', 
        params: { categoryId: category.categoryId } 
        }">
        {{ category.categoryName }}
      </router-link>
    </el-tag>
  </div>
</template>