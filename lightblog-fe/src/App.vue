<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue';
import Me from '@/components/Me.vue';
import Search from '@/components/Search.vue';
import Category from '@/components/Category.vue';
import Tag from '@/components/Tag.vue';
import myAxios from '@/utils/Http';
</script>

<template>
  <div
    class="flex justify-center items-center absolute w-4/5 mt-15 mb-30 min-w-2xl mx-auto left-1/2 transform -translate-x-1/2">
    <el-container>
      <el-aside class="w-ms bg-teal-50">
        <Me />
        <!-- <Search />
        <Category />
        <Tag /> -->
      </el-aside>
      <el-main class="bg-blue-50 p-0">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>