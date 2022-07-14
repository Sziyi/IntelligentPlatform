<template>
  <div class="user-container">
    <div class="user-query">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="角色" prop="username">
          <el-input
            @clear="handleQuerySearch"
            clearable
            v-model="queryForm.username"
            size="small"
            placeholder="请输入角色"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="handleQuerySearch"
            type="success"
            size="small"
            icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <div class="add-button">
        <el-button
          @click="handleOpenDialog"
          style="float: right"
          type="primary"
          size="small"
          icon="el-icon-edit"
          >新增</el-button
        >
      </div>
    </div>

    <el-table
      v-loading="loadingStatus"
      :data="userList"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="80"
      ></el-table-column>
      <el-table-column label="角色" prop="name"> </el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
      <el-table-column prop="remark" label="描述"></el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>

      <el-table-column label="操作" width="250px">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleOpenDialog(scope.row.id)"
            plain
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="handleOpenRoleDialog(scope.row)"
            plain
            >分配权限</el-button
          >
          <el-button size="mini" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[2, 5, 10]"
      :page-size="size"
      layout="jumper,  prev, pager, next,sizes,  total"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      center
      width="30%"
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="UserDialogForm"
        label-width="70px"
        label-position="right"
      >
        <el-form-item label="角色" prop="name">
          <el-input
            v-model.trim="UserDialogForm.name"
            autocomplete="off"
            clearable
            placeholder="请输入角色"
          ></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input
            v-model.trim="UserDialogForm.code"
            autocomplete="off"
            clearable
            placeholder="请输入编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input
            v-model.trim="UserDialogForm.remark"
            autocomplete="off"
            clearable
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model.trim="UserDialogForm.status">
            <el-radio v-model="radio" :label="1">启用</el-radio>
            <el-radio v-model="radio" :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" @click="handleVerifyDialogForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      width="30%"
      center
      title="分配角色"
      :visible.sync="roleDialogFormVisible"
    >
      <el-form
        :model="roleForm"
        ref="roleDialogForm"
        label-width="60px"
      >
        <el-form-item label="角色" prop="name">
          <el-input
            v-model.trim="UserDialogForm.name"
            autocomplete="off"
            clearable
            placeholder="请输入角色"
          ></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input
            v-model.trim="UserDialogForm.code"
            autocomplete="off"
            clearable
            placeholder="请输入编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input
            v-model.trim="UserDialogForm.remark"
            autocomplete="off"
            clearable
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model.trim="UserDialogForm.status">
            <el-radio v-model="radio" :label="1">启用</el-radio>
            <el-radio v-model="radio" :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserManagerApi from '@/api/User-manager'
import RoleManagerApi from '@/api/Role-manager'
export default {
  name: 'index',
  data() {
    return {
      roleDialogFormVisible: false,
      dialogTitle: '',
      dialogFormVisible: false,
      loadingStatus: false,
      current: 1,
      size: 10,
      total: 0,
      queryForm: {
        name: ''
      },
      UserDialogForm: {
        name: '',
        code: '',
        remark: '',
        status: '1'
      },
      userList: [],
      roleList: [],
      radio: '1',
      rules: {
        name: [{ required: true, message: '请输入角色', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      roleId: '',
      roleForm: {
        roleId: []
      }
    }
  },
  created() {
    this.handleGetUserList()
    this.handleGetRoleList()
  },
  methods: {
    // 初始化用户管理列表
    async handleGetUserList() {
      try {
        this.loadingStatus = true
        const data = {
          current: this.current,
          size: this.size,
          name: this.queryForm.name
        }
        const response = await RoleManagerApi.getRoleList(data)
        this.loadingStatus = false
        this.userList = response.records
        this.total = response.total
      } catch (e) {
        console.log(e)
        this.loadingStatus = false
      }
    },
    // 初始化角色列表
    async handleGetRoleList() {
      try {
        const data = { current: this.current, size: this.size }
        const response = await RoleManagerApi.getRoleList(data)
        this.roleList = response.records
      } catch (e) {
        console.log(e)
      }
    },
    // 分页条数改变
    handleSizeChange(size) {
      this.size = size
      this.handleGetUserList()
    },
    // 当前页改变
    handleCurrentChange(current) {
      this.current = current
      this.handleGetUserList()
    },
    // 用户查询
    handleQuerySearch() {
      this.handleGetUserList()
    },
    // 打开新增用户弹窗
    handleOpenDialog(id) {
      this.dialogTitle = typeof id === 'number' ? '编辑用户' : '新增用户'
      if (id && typeof id === 'number') this.handleFindUser(id)
      this.dialogFormVisible = true
    },
    // 新增弹窗确定按钮提交方法
    handleVerifyDialogForm() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          if (this.UserDialogForm.id) {
            await this.handleUpdateUser()
          } else {
            await this.handleSubmitAddData()
          }
        }
      })
    },
    // 新增用户
    async handleSubmitAddData() {
      this.UserDialogForm.status = Number(this.UserDialogForm.status)
      await UserManagerApi.addUser(this.UserDialogForm)
      this.dialogFormVisible = false
      this.$notify({ title: '提示', message: '添加成功', type: 'success' })
      this.handleGetUserList()
    },
    // 查询单个用户
    async handleFindUser(id) {
      const response = await UserManagerApi.findUser(id)
      console.log('userinfo', response)
      this.UserDialogForm = response
    },
    // 更新用户
    async handleUpdateUser() {
      const response = await UserManagerApi.updateUser(this.UserDialogForm)
      console.log(response)
      this.dialogFormVisible = false
      this.$notify({ title: '提示', message: '添加成功', type: 'success' })
      this.handleGetUserList()
    },
    handleOpenRoleDialog(row) {
      this.roleForm.roleId = []
      this.roleDialogFormVisible = true
      row.roles.forEach((item) => {
        this.roleForm.roleId.push(item.id)
      })
      this.roleId = row.id
      console.log(this.roleForm.roleId)
    },
    handleSubmitRole() {
      this.$refs.roleDialogForm.validate(async (valid) => {
        if (valid) {
          const response = await RoleManagerApi.updateRole(
            this.roleId,
            this.roleForm.roleId
          )
          this.roleDialogFormVisible = false
          this.$notify({ title: '提示', message: '更新成功', type: 'success' })
          this.handleGetUserList()
          console.log(response)
        }
      })
    }
  }
}
</script>

<style scoped>
.el-pagination {
  float: right;
  margin-top: 10px;
  padding-bottom: 20px;
}
.user-query {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.add-button {
  height: 100%;
  position: relative;
  top: -8px;
}
</style>
