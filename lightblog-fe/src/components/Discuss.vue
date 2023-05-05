<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import Http from '@/utils/Http';
import type { ApiResponse, DiscussForm } from '@/types'
import type { newUser, User } from '@/types/user'
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
    { params: { articleId: props.articleId } 
  })
  discussList.value = res;
}

watchEffect(async () => {
  await getDiscussListByArticleId();
})

// 提交留言按钮
const submitDiscussForm = async () => {
  // 查询用户是否存在
  if (await checkUser(discussForm.email)) {
    // 修改昵称为正确的昵称
    discussForm.nickname = user.value!.userNickname;
  } else {
    console.log('用户不存在, 创建用户');
    // 创建用户
    await createUser({ userNickname: discussForm.nickname, email: discussForm.email });
  }
  // 组成提交表单
  const newDiscussForm: newDiscuss = {
    userId: user.value!.userId,
    articleId: props.articleId,
    content: discussForm.content,
  }
  console.log(newDiscussForm);
  // 提交留言
  if (await submitDiscuss(newDiscussForm)) {
    // 提交成功
    console.log('提交成功');
    // 清空表单
    Object.assign(discussForm, initDiscussForm);
  } else {
    // 提交失败
    console.log('提交失败');
  }
  getDiscussListByArticleId();
}

// 查询用户是否存在
async function checkUser(email: string) {
  const res = await Http.get<User>('/getUserByEmail', { params: { email } })
  return res;
}

// 创建用户
async function createUser(params: newUser) {
  // error
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
          <el-link style="float: right; padding: 3px 0" type="primary">回复</el-link>
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