<script setup lang="ts">
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useAdminStore } from '../store/admin';
import router from '@/router';
import Http from '@/utils/Http';
import tools from '@/utils/tools';

const adminStore = useAdminStore()
const pwd = ref('')
const loginLoading = ref(false)

async function login() {
  if (loginLoading.value) return;
  loginLoading.value = true;
  if (pwd.value === '') {
    ElNotification({
      title: '请输入过关口令',
      type: 'warning'
    })
    loginLoading.value = false;
    return;
  }
  let hashPwd;
  try {
    hashPwd = tools.generateKey(pwd.value, 'lightblogsalt');
  } catch {
    ElNotification({
      title: '口令加密失败',
      type: 'error'
    })
    loginLoading.value = false;
    return;
  }
  try {
    const data = await Http.post<{ token: string }>('/login', { pwd: hashPwd });

    // 将 Token 存储在浏览器的本地存储（如 localStorage）
    localStorage.setItem('token', data.token)

    // 修改adminStore的isLogin状态
    adminStore.login()

    // todo 跳转到后台管理页面
    router.push('/admin');
  } catch {
    ElNotification({
      title: '过关口令错误',
      type: 'error'
    })
  } finally {
    loginLoading.value = false;
  }
}

const awesomePlace = ['女儿国', '米奇堡', '蟹堡王', '麦当劳', '肯德基', '盘丝洞', '火焰山', '巴黎圣母院']
const randomPlace = "前方前往" + awesomePlace[Math.floor(Math.random() * awesomePlace.length)]
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gradient-to-r from-green-300 to-blue-200">
    <div class="bg-white rounded-md flex flex-col py-13 px-25 items-center justify-center">
      <ElInput v-model="pwd" :placeholder="randomPlace" class="w-80 mb-5 leading-18" type="password" />
      <el-button
        class="font-medium text-2xl bg-gradient-to-r rounded-md py-5 px-6 transition duration-300 ease-in-out transform hover:scale-115 hover:text-blue-gray-800 focus:text-blue-gray-600 from-blue-400 to-green-400 active:scale-95"
        :loading="loginLoading" @click="login()">
        出发! {{ randomPlace }}!
      </el-button>
    </div>
  </div>
</template>