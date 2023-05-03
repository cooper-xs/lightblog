<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'

const searchContent = ref('');

function clickSearch() {
  // router.push({ path: '/search' });
}

</script>

<template>
  <div class="flex flex-row justify-center mb-6 space-x-4">
    <el-input v-model="searchContent" placeholder="请输入搜索内容" class="flex-auto" ></el-input>
    <el-button class="w-15" type="primary" @click="clickSearch">搜索</el-button>
  </div>
</template>