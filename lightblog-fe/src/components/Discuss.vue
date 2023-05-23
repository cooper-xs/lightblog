<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import Http from '@/utils/Http';
import type { DiscussForm } from '@/types'
import type { newUser, User } from '@/types/User'
import type { newDiscuss, viewDiscuss } from '@/types/Discuss'
import { ElNotification } from 'element-plus';

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

const getDiscussListByArticleId = async () => {
  const res = await Http.get<viewDiscuss[]>(
    '/getDiscussListByArticleId',
    {
      params: { articleId: props.articleId }
    })
  discussList.value = res;
}

watchEffect(async () => {
  await getDiscussListByArticleId();
})

// 提交留言按钮
async function submitDiscussForm() {
  try {
    // 查询用户是否存在
    const email = discussForm.email;
    const flag = await Http.get<User>('/getUserByEmail', { params: { email } })
    if (flag) {
      // 修改昵称为正确的昵称
      discussForm.nickname = user.value!.userNickname;
    } else {
      // todo 验证邮箱创建用户
      await createUser({ userNickname: discussForm.nickname, email: discussForm.email });
      ElNotification({
        title: '欢迎您',
        message: '创建用户成功 ' + user.value?.userNickname,
        type: 'success',
      })
      // 创建用户
    }
    // 组成提交表单
    const newDiscussForm: newDiscuss = {
      userId: user.value!.userId,
      articleId: props.articleId,
      content: discussForm.content,
    }
    // 提交留言
    if (await submitDiscuss(newDiscussForm)) {
      // 提交成功
      ElNotification({
        title: '成功',
        message: '提交留言成功',
        type: 'success',
      })
      Object.assign(discussForm, initDiscussForm);
    }
    getDiscussListByArticleId();
  } catch (DataValidationError) {
    ElNotification({
      title: '错误',
      message: '提交格式不正确, 请检查!',
      type: 'error',
    })
  }
}

// 创建用户
async function createUser(params: newUser) {
  try {
    const res = await Http.post<User>('/addUser', params)
    user.value = res;
  } catch (err) {
    ElNotification({
      title: '错误',
      message: '创建用户失败',
      type: 'error',
    })
  }
}

// 提交留言请求
async function submitDiscuss(newDiscussForm: newDiscuss) {
  const res = await Http.post<User>('/addDiscuss', newDiscussForm)
  return res
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
        <el-button type="primary" @click="submitDiscussForm">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div>
    <el-divider>留言列表</el-divider>
    <div class="mt-4">
      <el-card v-for="item in discussList" :key="item.discussId" class="box-card my-3">
        <div>
          <span>留言人：{{ item.userNickname }}</span>
          <!-- <el-link style="float: right; padding: 3px 0" type="primary">回复</el-link> -->
        </div>
        <div>
          <p>留言内容：{{ item.content }}</p>
        </div>
        <div>
          <span>留言时间：{{ item.createTime }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>