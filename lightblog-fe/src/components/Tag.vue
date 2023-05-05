<script setup lang="ts">
import type { ApiResponse } from '@/types';
import type { ViewTag } from '@/types/tag';
import Http from '@/utils/Http';
import { onMounted, ref, watchEffect } from 'vue';

const tags = ref<ViewTag[]>([]);

watchEffect(() => {
  fetchTagAll();
});

async function fetchTagAll() {
  const res = await Http.get<ViewTag[]>('/getTagListAll');
  tags.value = res;
}
</script>

<template>
  <div class="flex flex-wrap gap-2 my-2">
    <el-tag v-for="tag in tags" :key="tag.tagId" class="mx-1" round>
      <!-- <router-link :to="{
        name: 'Tag',
        params: { tagId: tag.tagId }
      }"> -->
        {{ tag.tagName }}
      <!-- </router-link> -->
    </el-tag>
  </div>
</template>