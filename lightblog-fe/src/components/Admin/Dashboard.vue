<template>
  <el-button type="primary" :loading-icon="Star" loading>在这没有意义, 去管理一下你的文章吧</el-button>
  <el-button type="primary" @click="$router.push('/admin/ArticleList')">文章列表</el-button>
  <el-button type="primary" @click="$router.push('/admin/addArticle')">添加新文章</el-button>
  <el-button type="primary" @click="$router.push('/admin/CategoryManager')">分类管理</el-button>
  <el-button type="primary" @click="$router.push('/admin/TagManager')">标签管理</el-button>
</template>

<script lang="ts" setup>
import { Star } from '@element-plus/icons-vue'
</script>
