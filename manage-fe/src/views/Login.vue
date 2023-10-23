<template>
  <div class="login-wrapper">
    <div class="modal">
      <div class="bg_modal"></div>
      <div class="modal-wrapper">
        <el-form
          ref="userForm"
          label-width="70px"
          :model="user"
          status-icon
          :rules="rules"
        >
          <div class="title">火星</div>
          <el-form-item prop="userName" label="用户名">
            <el-input
              type="text"
              placeholder="请输入用户名"
              :prefix-icon="User"
              v-model="user.userName"
            />
          </el-form-item>
          <el-form-item prop="userPwd" label="密码">
            <el-input
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              v-model="user.userPwd"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn-login" @click="login(userForm)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

let user = reactive({ userName: "", userPwd: "" });
let rules = reactive({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const userForm = ref();
const $api = inject("$api");
const store = useStore(); // 获取store实例
const router = useRouter(); // 获取store实例

const login = async (userForm) => {
  if (!userForm) return;
  await userForm.validate((valid) => {
    if (valid) {
      $api.login(user).then((res) => {
        store.commit("saveUserInfo", res);
        router.push("/welcome");
      })
    } else {
      return false;
    }
  });
};
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d8e9fc;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    background-color: #7096bb13;
    border-radius: 4px;
    box-shadow: 8px 8px 25px #b7c2ce, -8px -8px 25px #ffffff;
    transition: all 0.5s;
    position: relative;
    .bg_modal {
      width: 100%;
      height: 100%;
      padding: 50px;
      position: absolute;
      -webkit-filter: blur(20px);
      filter: blur(20px);
      &::before {
        content: "";
        background-color: #fdb66fac;
        position: absolute;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        top: 30%;
        right: 10%;
      }
    }
    &-wrapper {
      padding: 50px;
      .title {
        font-size: 50px;
        line-height: 1.5;
        text-align: center;
        margin-bottom: 30px;
      }
      .btn-login {
        width: 100%;
      }
    }
  }
}
</style>
