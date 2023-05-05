<script setup lang="ts">
const props = defineProps({
  categoryId: {
    type: Number,
    required: false
  }
})

</script>

<template>
  <ElCard>
    <ElTag>
      {{ props.categoryId }}
    </ElTag>
  </ElCard>
</template>