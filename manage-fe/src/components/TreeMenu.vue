<template>
  <template v-for="(menu, index) in userMenu" :key="menu._id">
    <el-sub-menu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
      :index="menu.path"
    >
      <template #title>
        <el-icon>
          <setting v-if="menu.icon=='el-icon-setting'"/>
          <Promotion v-else-if="menu.icon=='el-icon-s-promotion'"/>
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <TreeMenu :userMenu="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path">
      {{ menu.menuName }}
    </el-menu-item>
  </template>
</template>

<script setup>
const { ...userMenu } = defineProps(["userMenu"]);
</script>

<style></style>
