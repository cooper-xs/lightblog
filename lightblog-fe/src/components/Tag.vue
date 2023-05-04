<script setup lang="ts">
import type { ApiResponse } from '@/types';
import type { ViewTag } from '@/types/tag';
import Http from '@/utils/Http';
import { onMounted, ref } from 'vue';

const tags = ref<ViewTag[]>([]);

onMounted(() => {
  fetchTagAll();
});

async function fetchTagAll() {
  return await Http.get('/getTagListAll')
    .then(res => {
      const response = res.data as ApiResponse<ViewTag[]>;
      // 设置文章信息
      tags.value = response.data ?? [];
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}
</script>

<template>
  <div class="flex flex-wrap gap-2 my-2">
    <el-tag v-for="tag in tags" :key="tag.tagId" class="mx-1" round>
      <router-link :to="{
        name: 'Tag',
        params: { tagId: tag.tagId }
      }">
        {{ tag.tagName }}
      </router-link>
    </el-tag>
  </div>
</template>