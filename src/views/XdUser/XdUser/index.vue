<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入真实姓名" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="queryParams.nickName" placeholder="请输入昵称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="电话" prop="phoneNumber">
        <el-input v-model="queryParams.phoneNumber" placeholder="请输入电话" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="用户等级" prop="level">
        <el-input v-model="queryParams.level" placeholder="请输入用户等级" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="用户身份" prop="useType">
        <el-select v-model="queryParams.useType" placeholder="请选择用户身份" clearable>
          <el-option v-for="dict in dict.type.shop_user_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-select v-model="queryParams.source" placeholder="请选择来源" clearable>
          <el-option v-for="dict in dict.type.shop_source" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否使用过" prop="isUse">
        <el-select v-model="queryParams.isUse" placeholder="请选择是否使用过" clearable>
          <el-option v-for="dict in dict.type.shop_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="queryParams.email" placeholder="请输入邮箱" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.shop_number_status" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="notes">
        <el-input v-model="queryParams.notes" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['XdUser:XdUser:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['XdUser:XdUser:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['XdUser:XdUser:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['XdUser:XdUser:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="XdUserList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <!-- <el-table-column label="微信openid" align="center" prop="openid" /> -->
      <el-table-column label="真实姓名" align="center" prop="name" />
      <el-table-column label="昵称" align="center" prop="nickName" />
      <el-table-column label="头像" align="center" prop="avatar" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.avatar" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center" prop="phoneNumber" />
      <el-table-column label="密码" align="center" prop="password" />
      <el-table-column label="用户等级" align="center" prop="level" />
      <el-table-column label="用户身份" align="center" prop="useType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_user_type" :value="scope.row.useType" />
        </template>
      </el-table-column>
      <el-table-column label="来源" align="center" prop="source">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_source" :value="scope.row.source" />
        </template>
      </el-table-column>
      <el-table-column label="积分" align="center" prop="integral" />
      <el-table-column label="余额" align="center" prop="money" />
      <!-- <el-table-column label="默认地址ID" align="center" prop="addressId" /> -->
      <el-table-column label="是否使用过" align="center" prop="isUse">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_status" :value="scope.row.isUse" />
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center" prop="email" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_number_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="notes" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['XdUser:XdUser:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['XdUser:XdUser:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改微信用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="微信openid" prop="openid">
          <el-input v-model="form.openid" placeholder="请输入微信openid" />
        </el-form-item> -->
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <image-upload v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="用户等级" prop="level">
          <el-input v-model="form.level" placeholder="请输入用户等级" />
        </el-form-item>
        <el-form-item label="用户身份" prop="useType">
          <el-select v-model="form.useType" placeholder="请选择用户身份">
            <el-option v-for="dict in dict.type.shop_user_type" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-select v-model="form.source" placeholder="请选择来源">
            <el-option v-for="dict in dict.type.shop_source" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input v-model="form.integral" placeholder="请输入积分" />
        </el-form-item>
        <el-form-item label="余额" prop="money">
          <el-input v-model="form.money" placeholder="请输入余额" />
        </el-form-item>
        <!-- <el-form-item label="默认地址ID" prop="addressId">
          <el-input v-model="form.addressId" placeholder="请输入默认地址ID" />
        </el-form-item> -->
        <el-form-item label="是否使用过" prop="isUse">
          <el-radio-group v-model="form.isUse">
            <el-radio v-for="dict in dict.type.shop_status" :key="dict.value"
              :label="parseInt(dict.value)">{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option v-for="dict in dict.type.shop_number_status" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="notes">
          <el-input v-model="form.notes" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listXdUser,
    getXdUser,
    delXdUser,
    addXdUser,
    updateXdUser
  } from "@/api/XdUser/XdUser";

  export default {
    name: "XdUser",
    dicts: ['shop_status', 'shop_user_type', 'shop_number_status', 'shop_source'],
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 微信用户表格数据
        XdUserList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          name: null,
          nickName: null,
          phoneNumber: null,
          level: null,
          useType: null,
          source: null,
          isUse: null,
          email: null,
          status: null,
          notes: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          name: [{
            required: true,
            message: "真实姓名不能为空",
            trigger: "blur"
          }],
          nickName: [{
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          }],
          avatar: [{
            required: true,
            message: "头像不能为空",
            trigger: "blur"
          }],
          phoneNumber: [{
            required: true,
            message: "电话不能为空",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }],
          useType: [{
            required: true,
            message: "用户身份不能为空",
            trigger: "change"
          }],
          source: [{
            required: true,
            message: "来源不能为空",
            trigger: "change"
          }],
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询微信用户列表 */
      getList() {
        this.loading = true;
        listXdUser(this.queryParams).then(response => {
          this.XdUserList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          openid: null,
          name: null,
          nickName: null,
          avatar: null,
          phoneNumber: null,
          password: null,
          level: null,
          useType: null,
          source: null,
          integral: null,
          money: null,
          addressId: null,
          isUse: null,
          email: null,
          status: null,
          notes: null,
          createTime: null,
          updateTime: null,
          deptId: null,
          userId: null
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加微信用户";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getXdUser(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改微信用户";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateXdUser(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addXdUser(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除微信用户编号为"' + ids + '"的数据项？').then(function() {
          return delXdUser(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('XdUser/XdUser/export', {
          ...this.queryParams
        }, `XdUser_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
