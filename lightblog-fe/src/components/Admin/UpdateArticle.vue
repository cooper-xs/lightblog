<template>
  <div class="flex justify-center items-center">
    <div v-if="error">
      <ElEmpty description="去文章列表中选择文章吧" />
    </div>
    <div v-else-if="loading">
      <ElEmpty description="正在加载中" />
    </div>
    <el-form v-else-if="router.currentRoute.value.query.articleId" :model="updateArticleForm" label-width="80px"
      class="w-full" @submit.prevent="submitUpdateForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="文章名">
            <el-input v-model="updateArticleForm.title" placeholder="请输入文章名" maxlength="20" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章别名">
            <el-input v-model="updateArticleForm.postAliasName" placeholder="请输入文章别名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="置顶等级">
            <el-input-number v-model="updateArticleForm.topFlag" :min="0" :max="10"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="文章分类">
            <el-select v-model="updateArticleForm.categoryId" placeholder="请选择文章分类">
              <el-option v-for="category in categoryList?.children" :key="category.categoryId"
                :label="category.categoryName" :value="category.categoryId" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="文章封面">
            <el-input v-model="updateArticleForm.previewImageUrl" placeholder="素材地址为'/api/images/img-xxx.jpg', 下标为000-206" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="文章简介">
        <el-input v-model="updateArticleForm.articleSummary" placeholder="请输入文章简介" />
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="updateArticleForm.contentMd" type="textarea" placeholder="请输入文章内容" rows="30" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitUpdateForm">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '@/router';
import Http from '@/utils/Http';
import type { Article, updateArticle } from '@/types/Article';
import type { CategoryFamily } from '@/types/category';
import { ElNotification } from 'element-plus';

const initArticleForm: updateArticle = {
  articleId: 0,
  title: '',
  postAliasName: '',
  topFlag: 0,
  articleSummary: '',
  previewImageUrl: '',
  categoryId: 0,
  contentMd: '',
}

const loading = ref(false);
const error = ref(false);
const updateArticleForm = ref({ ...initArticleForm })
const article = ref<Article>();
const categoryList = ref<CategoryFamily>();
const articleId = ref(0);

onMounted(async () => {
  articleId.value = Number(router.currentRoute.value.query.articleId);
  loading.value = true;
  error.value = false;
  console.log('articleId.value', articleId.value);
  if (articleId.value) {
    // 获取文章详情
    await fetchArticle(articleId.value);
  } else {
    // 错误
    error.value = true;
  }
  fetchCategory();
  loading.value = false;
})

async function fetchArticle(articleId: number) {
  const res = await Http.get<Article>('/getArticleDetailForEdit', { params: { articleId } });
  if (!res) {
    error.value = true;
    return;
  }
  article.value = res;
  updateArticleForm.value.articleId = res.articleId;
  updateArticleForm.value.title = res.title;
  updateArticleForm.value.postAliasName = res.postAliasName;
  updateArticleForm.value.topFlag = res.topFlag;
  updateArticleForm.value.articleSummary = res.articleSummary;
  updateArticleForm.value.previewImageUrl = res.previewImageUrl;
  updateArticleForm.value.categoryId = res.categoryId;
  updateArticleForm.value.contentMd = res.contentMd;
}

async function fetchCategory() {
  const res = await Http.get<CategoryFamily>('/getCategoryList');
  if (!res) {
    error.value = true;
    return;
  }
  categoryList.value = res;
}

async function submitUpdateForm() {
  const res = await Http.post('/updateArticle', updateArticleForm.value);
  if (res) {
    ElNotification({
      title: '成功',
      message: '更新文章成功',
      type: 'success'
    })
    router.push({
      name: 'ArticleList'
    });
  }
}
</script>
