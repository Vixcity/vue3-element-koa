<template>
  <div class="basic_layout">
    <div class="nav-side"></div>
    <div class="content-right" style="margin-left: 200px">
      <div class="nav-top">
        <div class="bread">面包屑</div>
        <div class="user-info">用户信息</div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style lang="scss">
.basic_layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
  }
  .content-right {
    margin-left: 200px;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
    }
    .wrapper {
      background-color: #eef0f3;
      padding: 20px;
      .main-page {
        background: #fff;
        height: calc(100vh - 90px);
        overflow-y: auto;
      }
    }
  }
}
</style>
