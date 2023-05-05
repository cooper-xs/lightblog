<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue';
import Me from '@/components/Me.vue';
import Search from '@/components/Search.vue';
import Category from '@/components/Category.vue';
import Tag from '@/components/Tag.vue';
import myAxios from '@/utils/Http';
import Content from '@/components/PostList.vue';
import TagBar from '@/components/TagBar.vue';

const categoryId = ref(0);

function addCategory(id: number) {
  categoryId.value = id;
  console.log("Main: ", categoryId.value);
}
</script>

<template>
  <div class="flex justify-center items-center absolute w-4/5 mt-15 mb-30 min-w-2xl mx-auto left-1/2 transform -translate-x-1/2">
    <el-container>
      <el-aside class="w-ms bg-teal-50">
        <Me />
        <el-card class="box-card my-10 mx-4" shadow="hover">
          <Search />
          <Category @tag-clicked="addCategory" />
          <Tag />
        </el-card>
      </el-aside>
      <el-main class="bg-blue-50 p-5">
        <!-- <TagBar :categoryId="categoryId" /> -->
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template> 