<template>
  <div class="flex justify-center items-center pt-20">
    <ElForm :model="newArticleForm" label-width="120px">
      <el-form-item label="文章标题" :span="10">
        <ElInput v-model="newArticleForm.title" />
      </el-form-item>
      <el-form-item label="文章别名" :span="10">
        <ElInput v-model="newArticleForm.postAliasName" />
      </el-form-item>
      <el-form-item>
        <ElButton type="primary" @click="submitNewArticleForm">提交</ElButton>
      </el-form-item>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import type { Article, newArticle } from '@/types/Article';
import Http from '@/utils/Http';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';

const initArticleForm: newArticle = {
  title: '',
  postAliasName: '',
}
const newArticleForm = ref({ ...initArticleForm })

async function submitNewArticleForm() {
  try {
    if (newArticleForm.value.title === '') {
      ElNotification({
        title: '警告',
        message: '文章标题不能为空',
        type: 'warning'
      })
      return;
    } else if (newArticleForm.value.postAliasName === '') {
      ElNotification({
        title: '警告',
        message: '文章别名不能为空',
        type: 'warning'
      })
      return;
    }
    const newArticle = await Http.post<Article>('/addArticle', newArticleForm.value);
    ElNotification({
      title: '成功',
      message: '创建新文章成功',
      type: 'success'
    })
    router.push({ path: '/admin/updateArticle', query: { articleId: newArticle.articleId } })
  } catch (err) {
    ElNotification({
      title: '错误',
      message: '创建新文章失败',
      type: 'error'
    })
  }
}
</script>