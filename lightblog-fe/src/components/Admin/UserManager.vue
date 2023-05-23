<template>
  <div class="flex flex-col justify-center items-center">
    <!-- <el-table :data="userList" height="800" border style="width: 100%">
      <el-table-column prop="userId" label="用户 ID" width="180" />
      <el-table-column prop="userNickname" label="用户昵称" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="primary" size="default" @click="handleUpdateUser(row)">更新</el-button>
          <el-button type="danger" size="default" @click="handleDeleteUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <el-card v-for="user in userList" :key="user.userId" class="my-5 w-4/5">
      <section class="mb-4">
        <h2 class="text-lg font-bold mb-2">{{ user.userId }}</h2>
        <p class="text-gray-600">昵称:</p>
        <el-input v-model="user.userNickname" />
      </section>
      <section class="flex justify-between">
        <div class="flex flex-col">
          <span class="text-gray-600">邮箱:</span>
          <el-input v-model="user.email" />
        </div>
        <div class="flex flex-col">
          <span class="text-gray-600">创建时间:</span>
          <el-input v-model="user.createTime" disabled />
        </div>
        <div class="flex items-center">
          <el-button type="primary" @click="handleUpdateUser(user)">更新</el-button>
          <el-button type="danger" @click="handleDeleteUser(user)">删除</el-button>
        </div>
      </section>
    </el-card>
  </div>
</template>


<script lang="ts" setup>
import Http from '@/utils/Http';
import { onMounted, ref } from 'vue';
import type { User } from '@/types/User';
import { ElNotification } from 'element-plus';

const userList = ref<User[]>();

onMounted(() => {
  fetchUsers();
});

async function fetchUsers() {
  const res = await Http.get<User[]>('/getUserListAll');
  userList.value = res;
  userList.value.forEach((user) => {
    user.createTime = new Date(user.createTime).toLocaleString();
  });
}

async function handleUpdateUser(user: User) {
  try {
    await Http.post<User>('/updateUser', user);
    ElNotification({
      title: '成功',
      message: '更新用户成功',
      type: 'success',
      duration: 2000,
    })
    fetchUsers();
  } catch {
    ElNotification({
      title: '失败',
      message: '更新用户失败',
      type: 'error',
      duration: 2000,
    })
  }
}

async function handleDeleteUser(user: User) {
  try {
    await Http.delete('/deleteUser', { params: { userId: user.userId } });
    ElNotification({
      title: '成功',
      message: '删除用户成功',
      type: 'success',
      duration: 2000,
    })
    fetchUsers();
  } catch {
    ElNotification({
      title: '失败',
      message: '删除用户失败',
      type: 'error',
      duration: 2000,
    })
  }
}
</script>