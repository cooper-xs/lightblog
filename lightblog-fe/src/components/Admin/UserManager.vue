<template>
  <div class="flex flex-col justify-center items-center">
    <el-table :data="userList" height="800" border style="width: 100%">
      <el-table-column prop="userId" label="用户 ID" width="180" />
      <el-table-column prop="userNickname" label="用户昵称" >
        <template #default="{ row }">
          <el-input v-model="row.userNickname" />
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" >
        <template #default="{ row }">
          <el-input v-model="row.email" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }"> 
          <el-button type="primary" size="default" @click="handleUpdateUser(row)">更新</el-button>
          <el-button type="danger" size="default" @click="handleDeleteUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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