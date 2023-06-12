<template>
  <!-- <el-button class="my-10" type="primary" :loading-icon="Star" loading>在这没有意义, 去管理一下你的文章吧</el-button><br />
  <el-button type="primary" @click="$router.push('/admin/ArticleList')">文章列表</el-button>
  <el-button type="primary" @click="$router.push('/admin/addArticle')">添加新文章</el-button>
  <el-button type="primary" @click="$router.push('/admin/CategoryManager')">分类管理</el-button>
  <el-button type="primary" @click="$router.push('/admin/TagManager')">标签管理</el-button> -->
  <!-- <el-image class="h-full" :src="imgUrl" fit="contain"></el-image> -->
  <!-- <div class="flex items-center justify-center w-3/4 h-3/4 bg-cover bg-center"
    :style="{ backgroundImage: `url(${imgUrl})` }">
  </div> -->
  <div>
    
  </div>
</template>

<script lang="ts" setup>
// import { Star } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
// 生成一个三位随机数, 从0到206, 不足的用0补齐
const random = ref(Math.floor(Math.random() * 206).toString().padStart(3, '0'));
const imgUrl = ref('');

onMounted(() => {
  setInterval(() => {
    random.value = Math.floor(Math.random() * 200).toString().padStart(3, '0');
    imgUrl.value = `/api/images/img-${random.value}.jpg`
  }, 2 * 1000)
})

</script>
