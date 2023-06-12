<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import Http from '@/utils/Http';
import type { DiscussForm } from '@/types'
import type { User } from '@/types/User'
import type { newDiscuss, viewDiscuss } from '@/types/Discuss'
import { ElNotification } from 'element-plus';
import tools from '@/utils/tools';
import 'element-plus/theme-chalk/display.css'

const props = defineProps({
  articleId: {
    type: Number,
    required: true,
  }
})
const user = ref<User>()
const discussList = ref<viewDiscuss[]>()
const initDiscussForm: DiscussForm = {
  nickname: '',
  email: '',
  content: '',
}
const discussForm = reactive({ ...initDiscussForm })
const submitLoading = ref(false)

const getDiscussListByArticleId = async () => {
  const res = await Http.get<viewDiscuss[]>('/getDiscussListByArticleId', { params: { articleId: props.articleId } })
  discussList.value = res;
}

onMounted(async () => {
  await getDiscussListByArticleId();
})

// 提交留言按钮
async function submitDiscussForm() {
  if (submitLoading.value) return;
  submitLoading.value = true;

  // 检查表单是否填写完整
  if (!discussForm.nickname || !discussForm.email || !discussForm.content) {
    ElNotification({
      title: '错误',
      message: '请将留言信息填写完整',
      type: 'error',
    })
    submitLoading.value = false;
    return;
  }
  // 检查邮箱格式
  if (!tools.checkEmail(discussForm.email)) {
    ElNotification({
      title: '邮箱格式不正确',
      type: 'error',
    })
    submitLoading.value = false;
    return;
  }

  try {
    // 查询用户是否存在
    const email = discussForm.email;
    user.value = await Http.get<User>('/getUserByEmail', { params: { email } })
    if (user.value) {
      // 用户存在, 修改昵称为正确的昵称
      discussForm.nickname = user.value.userNickname;
    } else {
      // 创建用户
      user.value = await Http.post<User>('/addUser', { userNickname: discussForm.nickname, email: discussForm.email });
      ElNotification({
        title: '欢迎您',
        message: '创建用户成功 ' + user.value.userNickname,
        type: 'success',
      })
    }
    // 组成提交表单
    const newDiscussForm: newDiscuss = {
      userId: user.value.userId,
      articleId: props.articleId,
      content: discussForm.content,
    }
    // 提交留言
    await Http.post<User>('/addDiscuss', newDiscussForm)
    ElNotification({
      title: '提交留言成功',
      type: 'success',
    })
    Object.assign(discussForm, initDiscussForm);
    getDiscussListByArticleId();
  } catch (err) {
    ElNotification({
      title: '错误',
      message: '提交格式不正确或用户名已存在',
      type: 'error',
    })
  } finally {
    submitLoading.value = false;
  }
}
</script>

<template>
  <div class="mt-10">
    <el-form :model="discussForm" label-width="80px" @submit.prevent>
      <el-form-item label="昵称">
        <el-input v-model="discussForm.nickname" placeholder="请输入昵称" maxlength="20" show-word-limit />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="discussForm.email" placeholder="请输入电子邮箱" />
      </el-form-item>
      <el-form-item label="留言内容">
        <el-input v-model="discussForm.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入留言内容" maxlength="200" show-word-limit />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="submitLoading" @click="submitDiscussForm">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div>
    <el-divider class="">留言列表</el-divider>
    <div class="mt-4">
      <el-card v-for="item in discussList" :key="item.discussId" class="box-card my-3">
        <el-row>
          <el-col :sm="12" :lg="19" :xl="16">
            <div class="grid-content bg-purple">
              <span>留言人：{{ item.userNickname }}</span>
            </div>
          </el-col>
          <el-col :sm="12" :lg="5" :xl="8">
            <div class="grid-content bg-purple">
              <span>留言时间：{{ item.createTime }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <p>留言内容：{{ item.content }}</p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>