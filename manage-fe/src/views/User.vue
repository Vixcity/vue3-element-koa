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
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="small"> 编辑 </el-button>
            <el-button size="small" @click="handleDel(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" :total="pager.total" :current-page="pager.pageNum" :page-size="pager.pageSize"
        @current-change="handleCurrentChange" layout="prev,pager,next,jumper" background />
    </div>
    <el-dialog title="新增用户" v-model="showModel">
      <el-form ref="dialogForm" :model="userForm" label-width="100px" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userForm.userEmail" placeholder="请输入用户邮箱">
            <template #append>@qq.com </template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select v-model="userForm.roleList" placeholder="请选择用户系统角色" multiple style="width: 100%;">
            <el-option v-for="detp in roleList" :key="detp._id" :value="detp._id" :label="detp.roleName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader v-model="userForm.deptId" placeholder="请选择所属部门" :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }" clearable style="width: 100%;" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, inject, onMounted, reactive, ref, toRaw } from "vue";
import { ElMessage } from "element-plus";

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
// 选中用户列表的对象
const checkedUserIds = ref([]);
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
    formatter(row, column, value) {
      return {
        0: "管理员",
        1: "普通用户",
      }[value];
    },
  },
  {
    label: "用户状态",
    prop: "state",
    formatter(row, column, value) {
      return {
        1: "在职",
        2: "离职",
        3: "试用期",
      }[value];
    },
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
// 弹框显示对象
const showModel = ref(false);
// 新增用户Form对象
const userForm = reactive({
  state: 3
});
// 所有角色列表
const roleList = ref([]);
// 所有部门列表
const deptList = ref([]);
// 定义用户操作行为
const action = ref('add')
// 定义表单校验规则
const rules = reactive({
  userName: [
    {
      required: true,
      message: "请输入用户名称",
      trigger: "blur",
    },
  ],
  userEmail: [
    {
      required: true,
      message: "请输入用户邮箱",
      trigger: "blur",
    },
  ],
  mobile: [
    {
      pattern: /1{3-9}\d{9}/,
      message: '请输入正确的手机号格式',
      trigger: "blur",
    },
  ],
  deptId: [
    {
      required: true,
      message: "请输入用户邮箱",
      trigger: "blur",
    },
  ],
});
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
const handleReset = (form) => {
  ctx.$refs[form].resetFields();
};

// 分页事件处理
const handleCurrentChange = (current) => {
  pager.pageNum = current;
  getUserList();
};

// 用户单个删除
const handleDel = async (row) => {
  await $api.userDel({
    userId: [row.userId], // 可以单个删除，也可以批量删除
  });
  ElMessage.success("删除成功");
};

// 批量删除
const handlePatchDel = async () => {
  console.log(checkedUserIds.value);
  if (checkedUserIds.value.length === 0) {
    ElMessage.error("请选择要删除的用户");
    return;
  } else {
    const res = await $api.userDel({
      userId: checkedUserIds.value, // 可以单个删除，也可以批量删除
    });
    if (res.nModified > 0) {
      ElMessage.success("删除成功");
      getUserList();
    } else {
      ElMessage.error("删除失败");
    }
  }
};

// 表格多选
const handleSelectionChange = (list) => {
  checkedUserIds.value = list.map((item) => item.userId);
};

// 用户新增
const handleCreate = () => {
  showModel.value = true;
};

const getDeptList = async () => {
  let list = await $api.getDeptList()
  deptList.value = list
}

// 角色列表查询
const getRoleList = async () => {
  let list = await $api.getRoleList()
  roleList.value = list
}

// 用户弹窗关闭
const handleClose = () => {
  showModel.value = false
  handleReset('dialogForm')
}
// 用户提交
const handleSubmit = () => {
  ctx.$refs.dialogForm.validate(async (valid) => {
    if (valid) {
      let params = toRaw(userForm);
      params.userEmail += '@qq.com'
      params.action = action.value
      let res = await $api.userSubmit(params);
      if (res) {
        handleClose()
        ElMessage.success('用户创建成功')
        getUserList()
      }
    }
  })
}

// 初始化接口调用
onMounted(() => {
  getUserList();
  getDeptList();
  getRoleList();
});
</script>

<style lang="scss"></style>
