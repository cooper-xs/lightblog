<template>
  <el-card class="box-card m-10" shadow="hover">
    <div class="w-full h-44 flex flex-col items-center justify-center">
      <div class="flex items-center justify-center w-full">
        <el-avatar shape="square" :size="120" src="/src/assets/img/avatar.jpg" />
      </div>
      <div class="text-2xl font-bold mt-5">
        <RouterLink to="/">
          <span>LightBlog</span>
        </RouterLink>
      </div>
    </div>
  </el-card>
</template>