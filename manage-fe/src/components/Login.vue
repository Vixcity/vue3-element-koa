<template>
  <div>
    <h1>登录页</h1>
    <el-button @click="goHome">返回首页</el-button>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    goHome(){
      this.$router.push("/welcome")
    }
  }
};
</script>

<style></style>
