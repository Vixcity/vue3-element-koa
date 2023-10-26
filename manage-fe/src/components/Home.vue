<template>
  <div class="basic_layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
        <span>Manage</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#001529"
        class="nav-menu"
        router
        default-active="2"
        text-color="#fff"
        :collapse="isCollapse"
      >
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
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle" v-show="isCollapse">
            <el-icon><Expand /></el-icon>
          </div>
          <div class="menu-fold" @click="toggle" v-show="!isCollapse">
            <el-icon><Fold /></el-icon>
          </div>
          <div class="bread">面包屑</div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="true" class="notice">
            <el-icon><Bell /></el-icon>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">
                  邮箱：{{ userInfo.userEmail }}
                </el-dropdown-item>
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore(); // 获取store实例
const router = useRouter(); // 获取router实例

let userInfo = reactive({
  userName: "Vixcity",
  userEmail: "123456@qq.com",
});

const isCollapse = ref(false);

const toggle = () => {
  isCollapse.value = !isCollapse.value;
};

function handleLogout(key) {
  if (key === "email") return;
  store.commit("saveUserInfo", "");
  router.push("/login");
  userInfo = {
    userName: "",
    userEmail: "",
  };
}
</script>

<style lang="scss">
.basic_layout {
  position: relative;
  &::-webkit-scrollbar{
    width: 6px!important;
  }
  .nav-side {
    position: fixed;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    overflow-x: hidden;
    &.fold{
      width: 64px;
    }
    &.unfold{
      width: 200px;
    }
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        height: 32px;
        width: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
  }
  .content-right {
    transition: all .5s;
    &.fold{
      margin-left: 64px;
    }
    &.unfold{
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 16px;
          font-size: 18px;
        }
      }
      .user-info {
        display: flex;
        align-items: center;
        .notice {
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
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
