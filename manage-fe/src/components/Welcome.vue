<template>
  <div>
    <h1>{{ msg }} - 欢迎来到欢迎页</h1>
    <router-link to="/login">去登录</router-link>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  props: ["msg"],
};
</script>

<style></style>
