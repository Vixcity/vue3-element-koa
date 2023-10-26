<template>
  <el-sub-menu index="1">
    <template #title>
      <el-icon><setting /></el-icon>
      <span>系统管理</span>
    </template>
    <el-menu-item index="1-1">用户管理</el-menu-item>
    <el-menu-item index="1-2">菜单管理</el-menu-item>
  </el-sub-menu>
  <el-sub-menu index="2">
    <template #title>
      <el-icon><setting /></el-icon>
      <span>审批管理</span>
    </template>
    <el-menu-item index="2-1">休假申请</el-menu-item>
    <el-menu-item index="2-2">待我审批</el-menu-item>
  </el-sub-menu>
</template>

<script setup>
const { ...userMenu } = defineProps(["userMenu"]);
console.log(userMenu);
</script>

<style></style>
