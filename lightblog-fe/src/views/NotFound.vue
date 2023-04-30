<template>
  <div class="h-screen flex items-center justify-center bg-gradient-to-r from-green-300 to-blue-200">
    <div class="bg-white rounded-md flex flex-col py-15 px-30 items-center justify-center">
      <div class="font-bold text-9xl text-green-400">
        404
      </div>
      <div class="font-medium py-8 text-6xl">
        未找到页面
      </div>
      <div class="font-medium pb-8 text-2xl">
        您正在寻找的页面不存在
      </div>
      <div>
        <button
          class="font-medium text-2xl bg-gradient-to-r rounded-md py-3 px-6 transition duration-300 ease-in-out transform hover:scale-115 from-blue-400 to-green-400 active:scale-95">
          <router-link to="/">
            首页
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>