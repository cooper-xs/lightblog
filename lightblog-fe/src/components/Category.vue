<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import router from '@/router';
import Http from '@/utils/Http';
import type { CategoryFamily, CategoryState } from '@/types/category';

const props = defineProps({
  categoryId: {
    type: Number,
    default: 0,
  }
});

const categoryState = ref<CategoryState>({
  categorys: [],
  currentCategoryId: Number(router.currentRoute.value.query.categoryId)
});

async function fetchCategoryAll() {
  const res = await Http.get<CategoryFamily>('/getCategoryList');
  categoryState.value.categorys = res.children ?? [];
}

function clickCategory(id: number) {
  if (categoryState.value.currentCategoryId === id) {
    categoryState.value.currentCategoryId = 0;
  } else {
    categoryState.value.currentCategoryId = id;
  }
  const currentQuery = router.currentRoute.value.query;
  const newQuery = { ...currentQuery, categoryId: categoryState.value.currentCategoryId };
  router.push({
    path: '/',
    query: newQuery
  });
}

onMounted(() => {
  if (props.categoryId) {
    categoryState.value.currentCategoryId = props.categoryId;
  }
});

watchEffect(() => {
  fetchCategoryAll();
});
</script>

<template>
  <el-divider>
    <el-text class="mx-1 text-lg font-medium">分类</el-text>
  </el-divider>
  <div class="flex flex-wrap gap-2 my-2">
    <el-tag v-for="category in categoryState.categorys" :key="category.categoryId" class="mx-1 hover:cursor-pointer" round
      cursor-pointer :effect="categoryState.currentCategoryId === category.categoryId ? 'dark' : 'light'"
      @click="clickCategory(category.categoryId)">
      {{ category.categoryName }}
    </el-tag>
  </div>
</template>
