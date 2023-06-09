<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'

const searchContent = ref('');

function clickSearch() {
  const keywords = searchContent.value.replace(/\s+/g, ',');
  router.push({
    path: '/',
    query: { keywords }
  });
}

</script>

<template>
  <div class="flex flex-row justify-center mb-6 space-x-4">
    <el-input v-model="searchContent" placeholder="点击下方标签筛选" class="flex-auto" />
    <el-button class="w-15" type="primary" @click="clickSearch">搜索</el-button>
  </div>
</template>