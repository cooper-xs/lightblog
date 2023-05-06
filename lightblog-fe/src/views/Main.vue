<script setup lang="ts">
import { RouterView } from 'vue-router'
import Me from '@/components/Me.vue';
import Search from '@/components/Search.vue';
import Category from '@/components/Category.vue';
import Tag from '@/components/Tag.vue';
import { ref } from 'vue';

</script>

<template>
  <div
    class="flex justify-center items-center absolute w-4/5 mt-15 mb-30 min-w-2xl mx-auto left-1/2 transform -translate-x-1/2">
    <el-container>
      <el-aside class="w-ms bg-teal-50">
        <Me />
        <el-card class="box-card my-10 mx-4" shadow="hover">
          <Search />
          <Category />
          <Tag />
        </el-card>
      </el-aside>
      <el-main class="bg-blue-50 p-5">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template> 