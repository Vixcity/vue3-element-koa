<template>
  <div>
    <h1>登录页</h1>
    <Welcome msg="jack" />
    <el-button @click="goHome">返回首页</el-button>
  </div>
</template>

<script>
import Welcome from "./welcome.vue";
export default {
  name: "login",
  components: {
    Welcome,
  },
  methods: {
    goHome() {
      this.$router.push("/welcome");
    },
  },
};
</script>

<style></style>
