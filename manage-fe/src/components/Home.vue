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
        :default-active="activeMenu"
        text-color="#fff"
        :collapse="isCollapse"
      >
        <TreeMenu :userMenu="userMenu"/>
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
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="noticeCount > 0" class="notice">
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
                <el-dropdown-item command="logout">退出</el-dropdown-item>
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
import { reactive, ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import TreeMenu from "./TreeMenu.vue";
import BreadCrumb from "./BreadCrumb.vue";
const $api = inject("$api");
const store = useStore(); // 获取store实例
const router = useRouter(); // 获取router实例
const activeMenu = location.hash.slice(1)

let isCollapse = ref(false);
const toggle = () => {
  isCollapse.value = !isCollapse.value;
};

let userInfo = reactive(store.state.userInfo);
function handleLogout(key) {
  if (key === "email") return;
  store.commit("saveUserInfo", "");
  router.push("/login");
  userInfo = {
    userName: "",
    userEmail: "",
  };
}

let noticeCount = ref(0);
async function getNoticeCount() {
  try {
    const count = await $api.noticeCount();
    noticeCount.value = count;
  } catch (err) {
    console.error(err);
  }
}

let userMenu = ref([]);
async function getMenuList() {
  try {
    userMenu.value = await $api.getMenuList();
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  getNoticeCount();
  getMenuList();
});
</script>

<style lang="scss">
.basic_layout {
  position: relative;
  .nav-side {
    position: fixed;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    transition: width 0.5s;
    &.fold {
      width: 64px;
    }
    &.unfold {
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
      overflow-y: auto;
      overflow-x: hidden;
      border-right: none;
    }
  }
  .content-right {
    transition: all 0.5s;
    &.fold {
      margin-left: 64px;
    }
    &.unfold {
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
