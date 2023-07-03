<template>
  <div class="flex justify-center items-center">
    <div v-if="error">
      <ElEmpty description="去文章列表中选择文章吧" />
    </div>
    <div v-else-if="loading">
      <ElEmpty description="正在加载中" />
    </div>
    <el-form v-else-if="article" :model="updateArticleForm" label-width="80px" class="w-full"
      @submit.prevent="submitUpdateForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="文章名">
            <el-input v-model="updateArticleForm.title" placeholder="请输入文章名" maxlength="50" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章别名">
            <el-input v-model="updateArticleForm.postAliasName" placeholder="请输入文章别名" maxlength="50" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="置顶等级">
            <el-input-number v-model="updateArticleForm.topFlag" :min="0" :max="10" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="文章分类">
            <el-select v-model="updateArticleForm.categoryId" placeholder="请选择文章分类" default-first-option-disabled>
              <el-option v-for="category in categoryList?.children" :key="category.categoryId"
                :label="category.categoryName" :value="category.categoryId" />
              <el-option label="未选择" :value="-1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="文章标签">
            <el-button type="primary" @click="dialogTagVisible = true">选择标签</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章封面">
            <el-input v-model="updateArticleForm.previewImageUrl"
              placeholder="素材地址为'/api/images/img-xxx.jpg', 下标为000-206" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文章简介">
            <el-input v-model="updateArticleForm.articleSummary" placeholder="请输入文章简介" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="文章内容">
        <el-input v-model="updateArticleForm.contentMd" type="textarea" placeholder="请输入文章内容" rows="29" />
      </el-form-item>
      <el-row>
        <el-col :span="3">
          <el-form-item>
            <el-button type="primary" @click="submitUpdateForm">
              提交
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button type="danger" @click="dialogDeleteArticleVisible = true">
              删除
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <el-dialog v-model="dialogDeleteArticleVisible" title="确认">
    <span class="text-xl font-mono">确认删除文章: {{ article?.title }}?</span>
    <template #footer>
      <span class="mr-2.5">
        <el-button @click="dialogDeleteArticleVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteArticle()"> 确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogTagVisible" title="标签">
    <el-tag v-for="tag in tagState.tags" :key="tag.tagId" class="mx-1 hover:cursor-pointer" round cursor-pointer
      :effect="isTagSelected(tag.tagId) ? 'dark' : 'light'" @click="clickTags(tag.tagId)">
      {{ tag.tagName }}
    </el-tag>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import router from '@/router';
import Http from '@/utils/Http';
import type { Article, ArticleWithTag, updateArticle } from '@/types/Article';
import type { CategoryFamily } from '@/types/category';
import { ElNotification } from 'element-plus';
import type { TagState, TagStateAdmin, ViewTag } from '@/types/tag';

const initArticleForm: updateArticle = {
  articleId: 0,
  title: '',
  postAliasName: '',
  topFlag: 0,
  articleSummary: '',
  previewImageUrl: '',
  categoryId: -1,
  contentMd: '',
}
const loading = ref(false);
const error = ref(false);
const updateArticleForm = ref({ ...initArticleForm })
const article = ref<Article>();
const categoryList = ref<CategoryFamily>();
const articleId = ref(0);
const dialogDeleteArticleVisible = ref(false);
const dialogTagVisible = ref(false);
const tagState = ref<TagState>({
  tags: [],
  currentTagsId: [],
})

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
  fetchTag();
  fetchCategory();
  loading.value = false;
})

/** 获取文章详情 */
async function fetchArticle(articleId: number) {
  const res = await Http.get<ArticleWithTag>('/getArticleDetailForEdit', { params: { articleId } });
  if (!res) {
    error.value = true;
    return;
  }
  console.log('res.tagIds', res.tagIds);
  article.value = res.article;
  updateArticleForm.value.articleId = res.article.articleId;
  updateArticleForm.value.title = res.article.title;
  updateArticleForm.value.postAliasName = res.article.postAliasName;
  updateArticleForm.value.topFlag = res.article.topFlag;
  updateArticleForm.value.articleSummary = res.article.articleSummary;
  updateArticleForm.value.previewImageUrl = res.article.previewImageUrl;
  updateArticleForm.value.categoryId = res.article.categoryId;
  updateArticleForm.value.contentMd = res.article.contentMd;
  tagState.value.currentTagsId = res.tagIds;
}

/** 获取分类详情 */
async function fetchCategory() {
  const res = await Http.get<CategoryFamily>('/getCategoryList');
  if (!res) {
    error.value = true;
    return;
  }
  categoryList.value = res;
}

/** 获取标签详情 */
async function fetchTag() {
  const res = await Http.get<ViewTag[]>('/getTagListAll');
  if (!res) {
    error.value = true;
    return;
  }
  tagState.value.tags = res;
}

/** 计算标签是否被选中 */
const isTagSelected = computed(() => {
  return (tagId: number) => tagState.value.currentTagsId.includes(tagId);
})

/** 提交更新文章表格 */
async function submitUpdateForm() {
  if (updateArticleForm.value.categoryId === -1) {
    updateArticleForm.value.categoryId = null;
  }
  try {
    await Http.post('/updateArticle', updateArticleForm.value);
    const params = {
      articleId: articleId.value,
      tagIds: tagState.value.currentTagsId.join(','),
    }
    console.log(params)
    await Http.post('/updateATRByArticleIdAndTagIds', params)
    ElNotification({
      title: '成功',
      message: '更新文章成功',
      duration: 2000,
      type: 'success'
    })
    fetchArticle(articleId.value);
  } catch (error) {
    ElNotification({
      title: '失败',
      message: '更新文章失败嘞',
      duration: 2000,
      type: 'error'
    })
  }
}

/** 删除文章 */
async function deleteArticle() {
  const res = await Http.delete<Article>('/deleteArticleById', { params: { articleId: articleId.value } });
  if (res) {
    ElNotification({
      title: '成功',
      message: '删除文章成功',
      duration: 2000,
      type: 'success'
    })
    router.push({
      name: 'ArticleList'
    });
  } else {
    ElNotification({
      title: '失败',
      message: '删除文章失败',
      duration: 2000,
      type: 'error'
    })
  }
}

/** 点击标签 */
function clickTags(id: number) {
  const index = tagState.value.currentTagsId.indexOf(id);
  if (index === -1) {
    tagState.value.currentTagsId.push(id);
  } else {
    tagState.value.currentTagsId.splice(index, 1);
  }
}
</script>
