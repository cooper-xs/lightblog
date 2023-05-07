<script setup lang="ts">
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useAdminStore } from '../store/admin';
import router from '@/router';

const adminStore = useAdminStore()
const pwd = ref('')

function login() {
  if (pwd.value === '') {
    ElNotification({
      title: '禁止通行',
      message: '请输入过关口令',
      type: 'warning'
    })
    return;
  } else if (pwd.value !== 'light') {
    ElNotification({
      title: '禁止通行',
      message: '过关口令错误',
      type: 'error'
    })
    return;
  }

  // todo 向后端发送请求, 获取token, 存到adminState中
  adminStore.login();

  // todo 跳转到后台管理页面
  router.push('/admin');
}

const awesomePlace = ['女儿国', '米奇堡', '蟹堡王', '麦当劳', '肯德基', '盘丝洞', '火焰山', '巴黎圣母院']
const randomPlace = "前方前往" + awesomePlace[Math.floor(Math.random() * awesomePlace.length)]
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gradient-to-r from-green-300 to-blue-200">
    <div class="bg-white rounded-md flex flex-col py-13 px-25 items-center justify-center">
      <ElInput v-model="pwd" :placeholder="randomPlace" class="w-80 mb-5 leading-18" type="password" />
      <button
        class="font-medium text-2xl bg-gradient-to-r rounded-md py-3 px-6 transition duration-300 ease-in-out transform hover:scale-115 from-blue-400 to-green-400 active:scale-95"
        @click="login">
        我准备好了!
      </button>
    </div>
  </div>
</template>