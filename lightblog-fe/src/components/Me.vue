<template>
  <el-card class="box-card m-10" shadow="hover">
    <div class="w-full h-44 flex flex-col items-center justify-center">
      <div class="w-32 h-32 rounded-full bg-cover bg-no-repeat bg-center flex items-center justify-center w-full">
        <img src="../assets/img/avatar.jpg" alt="avatar">
      </div>
      <div class="text-2xl font-bold mt-5">
        <RouterLink to="/">
          <span>LightBlog</span>
        </RouterLink>
      </div>
      <!-- <div class="flex flex-row gap-4 text-sm">
        <div>
          <RouterLink to="/">
            主页
          </RouterLink>
        </div>
        <div>
          关于我
        </div>
      </div> -->
    </div>
  </el-card>
</template>