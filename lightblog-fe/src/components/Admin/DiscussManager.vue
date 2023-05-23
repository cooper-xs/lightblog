<template>
  <el-empty v-if="error" description="加载失败" />
  <el-empty v-else-if="loading" description="加载中" />
  <div v-else class="flex flex-col justify-center items-center">
    <el-table :data="discussList" height="800" border style="width: 100%">
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="content" label="评论内容" />
      <el-table-column prop="userNickname" label="用户昵称" />
      <el-table-column prop="articleId" label="文章 ID" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="danger" size="default" @click="deleteDiscuss(row.discussId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue'
import Http from '@/utils/Http';
import type { viewDiscuss } from '@/types/Discuss'
import { ElNotification } from 'element-plus';

const discussList = ref<viewDiscuss[]>()

const error = ref(false);
const loading = ref(false);

onMounted(async () => {
  fetchDiscussList();
})

async function fetchDiscussList() {
  try {
    loading.value = true;
    error.value = false;
    const res = await Http.get<viewDiscuss[]>('/getDiscussAll');
    discussList.value = res;
    loading.value = false;
  } catch {
    loading.value = false;
    error.value = true;
  }
}

async function deleteDiscuss(discussId: number) {
  try {
    console.log('discussId', discussId);
    await Http.delete(`/deleteDiscussById`, { params: { id: discussId } });
    ElNotification({
      title: '删除成功',
      type: 'success'
    })
    fetchDiscussList();
  } catch {
    ElNotification({
      title: '删除失败',
      type: 'error'
    })
  }
}
</script>