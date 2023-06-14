<template>
  <div class="flex justify-center items-center mt-40">
    <div v-if="error">
      <ElEmpty description="去文章列表中选择文章吧" />
    </div>
    <div v-else-if="loading">
      <ElEmpty description="正在加载中" />
    </div>
    <div v-else-if="categoryState.categorys" class="space-y-4 w-2/3 w-min-250">
      <el-card class="flex flex-wrap gap-2 my-2 w-full">
        <el-tag v-for="category in categoryState.categorys" :key="category.categoryId" class="mx-1 hover:cursor-pointer"
          round cursor-pointer :effect="categoryState.currentCategoryId === category.categoryId ? 'dark' : 'light'"
          @click="clickCategory(category.categoryId)">
          {{ category.categoryId }}: {{ category.categoryName }}
        </el-tag>
      </el-card>
      <el-card class="flex justify-center items-center w-full">
        <!-- 显示对应分类内容 -->
        <el-form :model="categoryForm" label-width="80px" class="w-full" @submit.prevent>
          <el-row>
            <el-col :span="9">
              <el-form-item label="分类名称">
                <el-input v-model="categoryForm.categoryName" placeholder="请输入分类名" maxlength="30" show-word-limit />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="分类别名">
                <el-input v-model="categoryForm.categoryAliasName" placeholder="请输入分类别名" maxlength="30" show-word-limit />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" @click="dialogSelectParentCategoryVisible = true">
                  <span v-if="categoryForm.parentId">父分类id: {{ categoryForm.parentId }}</span>
                  <span v-else>请选择父分类id</span>
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="分类描述">
            <el-input v-model="categoryForm.description" type="textarea" placeholder="请输入分类描述" rows="4" />
          </el-form-item>
          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-button type="primary" @click="submitCategoryForm()">
                  {{ categoryForm.categoryId === 0 ? "保存" : "更新" }}
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button type="danger"
                  :disabled="typeof categoryForm.categoryId !== 'undefined' && categoryForm.categoryId !== 0 ? false : true"
                  @click="checkDeleteCategory()">
                  删除
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button type="success" @click="clickAddCategory()">
                  添加分类
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="dialogSelectParentCategoryVisible" title="选择父分类id, 选择当前分类则取消分类关联">
    <el-tag v-for="category in categoryState.categorys" :key="category.categoryId" class="mx-1 hover:cursor-pointer" round
      cursor-pointer :effect="categoryState.currentCategoryId === category.categoryId ? 'plain' : 'light'"
      @click="clickParentCategory(category.categoryId)">
      {{ category.categoryId }}: {{ category.categoryName }}
    </el-tag>
  </el-dialog>
  <el-dialog v-model="dialogConfirmVisible" title="确认">
    <span>确认删除下列文章的分类:<br /></span>
    <span v-for="article in articlesByCategory" :key="article" class="text-shadow-md">{{ article }}<br /></span>
    <template #footer>
      <span class="mr-2.5">
        <el-button @click="dialogConfirmVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteCategory()"> 确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { CategoryForm } from '@/types';
import type { ArticleListView, ArticleCardView, Article } from '@/types/Article';
import type { Category, CategoryFamily, CategoryState } from '@/types/category';
import Http from '@/utils/Http';
import { ElNotification } from 'element-plus';
import { onMounted, ref, reactive } from 'vue';

const loading = ref(false);
const error = ref(false);
const categoryState = ref<CategoryState>({
  categorys: [],
  currentCategoryId: 0,
});
const initCategoryForm: CategoryForm = {
  categoryId: 0,
  categoryName: '',
  categoryAliasName: '',
  description: '',
  parentId: 0,
}
const categoryForm = reactive({ ...initCategoryForm })
const dialogSelectParentCategoryVisible = ref(false);
const dialogConfirmVisible = ref(false);
const articlesByCategory = ref([] as string[])


onMounted(async () => {
  loading.value = true;
  error.value = false;
  try {
    await fetchCategory();
    if(categoryState.value.categorys.length === 0) {
      return;
    }
    categoryState.value.currentCategoryId = categoryState.value.categorys[0].categoryId;
    categoryForm.categoryId = categoryState.value.categorys[0].categoryId;
    categoryForm.categoryName = categoryState.value.categorys[0].categoryName;
    categoryForm.categoryAliasName = categoryState.value.categorys[0].categoryAliasName;
    categoryForm.description = categoryState.value.categorys[0].description;
    categoryForm.parentId = categoryState.value.categorys[0].parentId;
  } catch {
    ElNotification({
      title: '错误',
      message: '获取分类列表失败',
      type: 'error',
    });
  } finally {
    loading.value = false;
  }
});


async function fetchCategory() {
  const res = await Http.get<CategoryFamily>('/getCategoryList');
  if (!res) {
    error.value = true;
    return;
  }
  categoryState.value.categorys = res.children ?? [];
}

function clickCategory(id: number) {
  if (categoryState.value.currentCategoryId === id) {
    categoryState.value.currentCategoryId = 0;
  } else {
    categoryState.value.currentCategoryId = id;
  }
  const category = categoryState.value.categorys.find(item => item.categoryId === id);
  if (category) {
    categoryForm.categoryId = category.categoryId;
    categoryForm.categoryName = category.categoryName;
    categoryForm.categoryAliasName = category.categoryAliasName;
    categoryForm.description = category.description;
    categoryForm.parentId = category.parentId;
  }
}

function clickParentCategory(id: number) {
  // 如果选择自己, 清除父分类; 如果选择其他, 标记父分类
  if (categoryState.value.currentCategoryId === id) {
    categoryForm.parentId = 0;
  } else {
    categoryForm.parentId = id;
  }
  dialogSelectParentCategoryVisible.value = false;
}

function clickAddCategory() {
  categoryState.value.currentCategoryId = 0;
  Object.assign(categoryForm, initCategoryForm);
}

/** 提交分类表格: 更新或者添加分类 */
async function submitCategoryForm() {
  if (categoryForm.categoryId !== 0) {
    const res = await Http.post<Category>('/updateCategory', categoryForm);
    if (res) {
      fetchCategory();
      ElNotification({
        title: '成功',
        message: '分类更新成功啦',
        duration: 2000,
        type: 'success',
      });
    } else {
      ElNotification({
        title: '失败',
        message: '分类更新好像出了点问题哦',
        duration: 2000,
        type: 'error',
      });
    }
  } else {
    const res = await Http.post<Category>('/addCategory', categoryForm);
    if (res) {
      fetchCategory();
      ElNotification({
        title: '成功',
        message: '分类添加成功啦',
        duration: 2000,
        type: 'success',
      });
    } else {
      ElNotification({
        title: '失败',
        message: '分类添加好像出了点问题哦',
        duration: 2000,
        type: 'error',
      });
    }
  }
}

/** 删除分类 */
async function checkDeleteCategory() {
  const paramsToFindCategory = { parentId: categoryForm.categoryId };
  const findCategory = await Http.get<CategoryFamily>('/getCategoryList', { params: paramsToFindCategory });
  if (findCategory.children.length > 0) {
    ElNotification({
      title: '失败',
      message: '含有子分类: ' + findCategory.children.map(item => item.categoryName) + "\n先删除子分类或者修改其父分类属性哦",
      duration: 5000,
      type: 'error',
    });
    return;
  }
  const findArticle = await Http.get<Article[]>('/getArticleListByCategoryId', { params: { categoryId: categoryForm.categoryId } })
  if (findArticle?.length > 0) {
    articlesByCategory.value = findArticle.map(item => item.title);
    dialogConfirmVisible.value = true;
    return;
  }
  deleteCategory()
}

async function deleteCategory() {
  dialogConfirmVisible.value = false;
  try {
    await Http.delete<Category>('/deleteCategory', { params: { categoryId: categoryForm.categoryId } });
    ElNotification({
      title: '成功',
      message: '分类删除成功!',
      duration: 2000,
      type: 'success',
    });
    fetchCategory();
    Object.assign(categoryForm, initCategoryForm);
    categoryForm.categoryId = 0;
  } catch (error) {
    console.log(error);

    ElNotification({
      title: '失败',
      message: '分类删除失败',
      duration: 2000,
      type: 'error',
    });
  }
}
</script>
