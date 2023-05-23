<template>
  <el-row>
    <el-col :span="2" :offset="3">
      <el-button type="primary" >添加文件</el-button>
    </el-col>
    <el-col :span="2">
      <el-button type="default" >批量选择</el-button>
    </el-col>
    <el-col :span="2">
      <el-button type="danger" >删除文件</el-button>
    </el-col>
  </el-row>
  <div class="flex mt-10">
    <el-card class="w-40 h-40">
      图片
    </el-card>
  </div>
</template>

<script setup lang="ts">
//
</script>