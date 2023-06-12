<template>
  <div class="flex justify-center items-center mt-40">
    <div v-if="error">
      <ElEmpty description="去文章列表中选择文章吧" />
    </div>
    <div v-else-if="loading">
      <ElEmpty description="正在加载中" />
    </div>
    <div v-else class="space-y-4 w-2/3">
      <el-card class="flex flex-wrap gap-2 my-2 w-full">
        <el-tag v-for="tag in tagState.tags" :key="tag" class="mx-1 hover:cursor-pointer" round cursor-pointer
          :effect="tagState.currentTagsId === tag.tagId ? 'dark' : 'light'" @click="clickTag(tag.tagId)">
          {{ tag.tagId }}: {{ tag.tagName }}
        </el-tag>
      </el-card>
      <el-card class="flex justify-center items-center w-full">
        <el-form :model="tagForm" label-width="80px" class="w-full" @submit.prevent>
          <el-row>
            <el-col :span="12">
              <el-form-item label="标签名称">
                <el-input v-model="tagForm.tagName" placeholder="请输入标签名" maxlength="30" show-word-limit />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标签别名">
                <el-input v-model="tagForm.tagAliasName" placeholder="请输入标签别名" maxlength="30" show-word-limit />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="标签描述">
            <el-input v-model="tagForm.description" type="textarea" placeholder="请输入标签描述" rows="4" />
          </el-form-item>
          <!-- 提交/添加/删除标签 -->
          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-button type="primary" @click="submitTagForm()">
                  {{ tagForm.tagId === 0 ? "保存" : "更新" }}
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button type="danger"
                  :disabled="typeof tagForm.tagId !== 'undefined' && tagForm.tagId !== 0 ? false : true"
                  @click="checkDeleteTag()">
                  删除
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button type="success" @click="clickAddTag()">
                  添加标签
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="dialogConfirmVisible" title="确认">
    <span>确认删除下列文章与标签{{ tagForm.tagName }}的关联？<br /></span>
    <span v-for="article in articlesByTag" :key="article" class="text-shadow-md">{{ article }}<br /></span>
    <template #footer>
      <span class="mr-2.5">
        <el-button @click="dialogConfirmVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteTag()"> 确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { TagForm } from '@/types';
import type { Article, ArticleListView } from '@/types/Article';
import type { TagStateAdmin, ViewTag } from '@/types/tag';
import Http from '@/utils/Http';
import { ElNotification } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

const error = ref(false);
const loading = ref(false);
const tagState = ref<TagStateAdmin>({
  tags: [],
  currentTagsId: 0,
})
const initTagForm: TagForm = {
  tagId: 0,
  tagName: '',
  tagAliasName: '',
  description: '',
}
const tagForm = reactive({ ...initTagForm })
const articlesByTag = ref([] as string[]);
const dialogConfirmVisible = ref(false);

onMounted(() => {
  loading.value = true;
  fetchTag();
  loading.value = false;
});

async function fetchTag() {
  const res = await Http.get<ViewTag[]>('/getTagListAll');
  if (!res) {
    error.value = true;
    return;
  }
  tagState.value.tags = res;
}

function clickTag(id: number) {
  if (tagState.value.currentTagsId === id) {
    tagState.value.currentTagsId = 0;
  } else {
    tagState.value.currentTagsId = id;
  }
  const tag = tagState.value.tags.find(item => item.tagId === id);
  if (tag) {
    tagForm.tagId = tag.tagId;
    tagForm.tagName = tag.tagName;
    tagForm.tagAliasName = tag.tagAliasName;
    tagForm.description = tag.description;
  }
}

async function submitTagForm() {
  if (tagForm.tagId === 0) {
    // 添加标签
    try {
      const res = await Http.post<ViewTag>('/addTag', tagForm);
      await fetchTag();
      clickTag(res.tagId);
      ElNotification({
        title: '成功',
        message: '标签添加成功',
        duration: 2000,
        type: 'success',
      });
    } catch {
      console.log(tagForm.tagId)
      ElNotification({
        title: '失败',
        message: '标签添加失败',
        duration: 2000,
        type: 'error',
      });
    }
  } else {
    // 修改标签
    try {
      await Http.post('/updateTag', tagForm);
      fetchTag();
      ElNotification({
        title: '成功',
        message: '标签修改成功',
        duration: 2000,
        type: 'success',
      });
    } catch {
      ElNotification({
        title: '失败',
        message: '标签修改失败',
        duration: 2000,
        type: 'error',
      });
    }
  }
}

async function checkDeleteTag() {
  const findArticle = await Http.get<Article[]>('/getArticleListByTagId', { params: { tagId: tagForm.tagId } });
  if (findArticle?.length > 0) {
    articlesByTag.value = findArticle.map(item => item.title);
    dialogConfirmVisible.value = true;
    return;
  }
  deleteTag();
}

async function deleteTag() {
  dialogConfirmVisible.value = false;
  await Http.delete<ViewTag>('/deleteTag', { params: { tagId: tagForm.tagId } });
  fetchTag();
  clickAddTag();
}

function clickAddTag() {
  tagState.value.currentTagsId = 0;
  Object.assign(tagForm, initTagForm);
}
</script>