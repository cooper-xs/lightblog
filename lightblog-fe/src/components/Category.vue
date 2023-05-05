<script setup lang="ts">
import type { CategoryFamily, ViewCategory } from '@/types/category';
import Http from '@/utils/Http';
import { ref, watchEffect } from 'vue';

const emits = defineEmits({
  'tag-clicked': (id: number) => typeof id === 'number',
});

const categories = ref<ViewCategory[]>([]);

async function fetchCategoryAll() {
  const res = await Http.get<CategoryFamily>('/getCategoryList');
  categories.value = res.children ?? [];
}

function handleClick(categoryId: number) {
  // eslint-disable-next-line vue/custom-event-name-casing
  emits('tag-clicked', categoryId);
  // todo 修改query参数
}

watchEffect(() => {
  fetchCategoryAll();
});
</script>

<template>
  <div class="flex flex-wrap gap-2 my-2">
    <el-tag v-for="category in categories" :key="category.categoryId" class="mx-1" round
      @click="handleClick(category.categoryId)">
      {{ category.categoryName }}
    </el-tag>
  </div>
</template>
