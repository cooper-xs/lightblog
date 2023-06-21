<template>
  <div class="h-full flex items-center justify-center text-2xl">
    <div class="bg-gray-600 bg-opacity-40">
      <p>{{ dailyQuote }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      dailyQuote: '',
    };
  },
  async created() {
    try {
      const response = await axios.get('https://v1.hitokoto.cn');
      this.dailyQuote = response.data.hitokoto;
    } catch (error) {
      console.error('获取每日一言失败:', error);
    }
  },
};
</script>
