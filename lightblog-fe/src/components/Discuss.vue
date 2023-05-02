<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  nickname: '',
  email: '',
  content: ''
})

const submit = () => {
  // console.log(form)
  alert('提交成功: ' + form.nickname)
}
</script>

<template>
  <div class="mt-10">
    <el-form ref="form" label-width="80px" :model="form">
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入电子邮箱" />
      </el-form-item>
      <el-form-item label="留言内容">
        <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入留言内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>