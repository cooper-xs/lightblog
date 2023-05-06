<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import router from '@/router';
import Http from '@/utils/Http';
import type { TagState, ViewTag } from '@/types/tag';

const tagState = ref<TagState>({
  tags: [], // 所有标签
  currentTagsId: router.currentRoute.value.query.tagIds ? (router.currentRoute.value.query.tagIds as string).split(',').map(Number) : [] // 当前选中的标签
});

async function fetchTagAll() {
  const res = await Http.get<ViewTag[]>('/getTagListAll');
  tagState.value.tags = res;
}

function clickTags(id: number) {
  const index = tagState.value.currentTagsId.indexOf(id);
  if (index === -1) {
    tagState.value.currentTagsId.push(id);
  } else {
    tagState.value.currentTagsId.splice(index, 1);
  }
  const currentQuery = router.currentRoute.value.query;
  const newQuery = { ...currentQuery, tagIds: tagState.value.currentTagsId.join(',') };
  router.push({
    path: '/',
    query: newQuery
  });
}

const isTagSelected = computed(() => {
  return (tagId: number) => tagState.value.currentTagsId.includes(tagId);
})

watchEffect(() => {
  fetchTagAll();
});

</script>

<template>
  <el-divider>
    <el-text class="mx-1 text-lg font-medium">标签</el-text>
  </el-divider>
  <div class="flex flex-wrap gap-2 my-2">
    <el-tag v-for="tag in tagState.tags" :key="tag.tagId" class="mx-1 hover:cursor-pointer" round cursor-pointer
      :effect="isTagSelected(tag.tagId) ? 'dark' : 'light'" @click="clickTags(tag.tagId)">
      {{ tag.tagName }}
    </el-tag>
  </div>
</template>
