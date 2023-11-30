<template>
  <div class="user-manege">
    <div class="query-form">
      <el-form :inline="true" :model="user" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state" placeholder="请选择在职状态">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="userList">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="small" @click="handleClick"> 编辑 </el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :total="pager.total"
        :current-page="pager.pageNum"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
        layout="prev,pager,next,jumper"
        background
      />
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, inject, onMounted, reactive, ref } from "vue";

// 初始化 <------------> 开始
// 获取全局变量
const $api = inject("$api");
const { ctx } = getCurrentInstance();
// 初始化用户表单对象
const user = reactive({
  userId: "",
  userName: "",
  state: 0,
});
// 初始化用户列表数据
const userList = ref([]);
// 初始化分页对象
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
});
// 定义动态表格格式
const columns = reactive([
  {
    label: "用户ID",
    prop: "userId",
  },
  {
    label: "用户名称",
    prop: "userName",
  },
  {
    label: "用户邮箱",
    prop: "userEmail",
  },
  {
    label: "用户角色",
    prop: "role",
  },
  {
    label: "用户状态",
    prop: "state",
  },
  {
    label: "注册时间",
    prop: "createTime",
  },
  {
    label: "最后登录时间",
    prop: "lastLoginTime",
  },
]);
// 初始化 <------------> 结束

// 获取用户列表
const getUserList = async () => {
  const params = { ...user, ...pager };
  try {
    const { list, page } = await $api.getUserList(params);
    userList.value = list;
    pager.total = page.total;
  } catch (err) {
    console.log(err);
  }
};

// 查询事件，获取用户列表
const handleQuery = () => {
  getUserList();
};

// 重置查询表单
const handleReset = () => {
  console.log(ctx.$refs.form);
  ctx.$refs.form.resetFields();
};

const handleCurrentChange = (current) => {
  pager.pageNum = current;
  getUserList()
};

// 初始化接口调用
onMounted(() => {
  getUserList();
});
</script>

<style lang="scss"></style>
