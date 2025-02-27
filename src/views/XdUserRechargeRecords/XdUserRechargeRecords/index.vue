<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="uId">
        <el-input
          v-model="queryParams.uId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户ID(系统)" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID(系统)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门ID" prop="deptId">
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入部门ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="充值金额" prop="rechargeAmount">
        <el-input
          v-model="queryParams.rechargeAmount"
          placeholder="请输入充值金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付方式" prop="paymentMethod">
        <el-select v-model="queryParams.paymentMethod" placeholder="请选择支付方式" clearable>
          <el-option
            v-for="dict in dict.type.shop_pay_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="支付状态" prop="paymentStatus">
        <el-select v-model="queryParams.paymentStatus" placeholder="请选择支付状态" clearable>
          <el-option
            v-for="dict in dict.type.shop_pay_status_range"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="交易ID" prop="transactionId">
        <el-input
          v-model="queryParams.transactionId"
          placeholder="请输入交易ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="充值时间" prop="rechargeTime">
        <el-date-picker clearable
          v-model="queryParams.rechargeTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择充值时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="记录创建时间" prop="createdTime">
        <el-date-picker clearable
          v-model="queryParams.createdTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择记录创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['XdUserRechargeRecords:XdUserRechargeRecords:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['XdUserRechargeRecords:XdUserRechargeRecords:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['XdUserRechargeRecords:XdUserRechargeRecords:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['XdUserRechargeRecords:XdUserRechargeRecords:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="XdUserRechargeRecordsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="uId" />
      <el-table-column label="用户ID(系统)" align="center" prop="userId" />
      <el-table-column label="部门ID" align="center" prop="deptId" />
      <el-table-column label="充值金额" align="center" prop="rechargeAmount" />
      <el-table-column label="支付方式" align="center" prop="paymentMethod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_pay_type" :value="scope.row.paymentMethod"/>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" align="center" prop="paymentStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_pay_status_range" :value="scope.row.paymentStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="交易ID" align="center" prop="transactionId" />
      <el-table-column label="充值时间" align="center" prop="rechargeTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.rechargeTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="记录创建时间" align="center" prop="createdTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['XdUserRechargeRecords:XdUserRechargeRecords:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['XdUserRechargeRecords:XdUserRechargeRecords:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改用户充值记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="uId">
          <el-input v-model="form.uId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户ID(系统)" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID(系统)" />
        </el-form-item>
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入部门ID" />
        </el-form-item>
        <el-form-item label="充值金额" prop="rechargeAmount">
          <el-input v-model="form.rechargeAmount" placeholder="请输入充值金额" />
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-select v-model="form.paymentMethod" placeholder="请选择支付方式">
            <el-option
              v-for="dict in dict.type.shop_pay_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态" prop="paymentStatus">
          <el-select v-model="form.paymentStatus" placeholder="请选择支付状态">
            <el-option
              v-for="dict in dict.type.shop_pay_status_range"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易ID" prop="transactionId">
          <el-input v-model="form.transactionId" placeholder="请输入交易ID" />
        </el-form-item>
        <el-form-item label="充值时间" prop="rechargeTime">
          <el-date-picker clearable
            v-model="form.rechargeTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择充值时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="记录创建时间" prop="createdTime">
          <el-date-picker clearable
            v-model="form.createdTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择记录创建时间">
          </el-date-picker>
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
import { listXdUserRechargeRecords, getXdUserRechargeRecords, delXdUserRechargeRecords, addXdUserRechargeRecords, updateXdUserRechargeRecords } from "@/api/XdUserRechargeRecords/XdUserRechargeRecords";

export default {
  name: "XdUserRechargeRecords",
  dicts: ['shop_pay_status_range', 'shop_pay_type'],
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
      // 用户充值记录表格数据
      XdUserRechargeRecordsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        uId: null,
        userId: null,
        deptId: null,
        rechargeAmount: null,
        paymentMethod: null,
        paymentStatus: null,
        transactionId: null,
        rechargeTime: null,
        createdTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        uId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID(系统)不能为空", trigger: "blur" }
        ],
        deptId: [
          { required: true, message: "部门ID不能为空", trigger: "blur" }
        ],
        rechargeAmount: [
          { required: true, message: "充值金额不能为空", trigger: "blur" }
        ],
        paymentMethod: [
          { required: true, message: "支付方式不能为空", trigger: "change" }
        ],
        paymentStatus: [
          { required: true, message: "支付状态不能为空", trigger: "change" }
        ],
        rechargeTime: [
          { required: true, message: "充值时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户充值记录列表 */
    getList() {
      this.loading = true;
      listXdUserRechargeRecords(this.queryParams).then(response => {
        this.XdUserRechargeRecordsList = response.rows;
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
        uId: null,
        userId: null,
        deptId: null,
        rechargeAmount: null,
        paymentMethod: null,
        paymentStatus: null,
        transactionId: null,
        rechargeTime: null,
        createdTime: null,
        updateTime: null
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户充值记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getXdUserRechargeRecords(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户充值记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateXdUserRechargeRecords(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addXdUserRechargeRecords(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除用户充值记录编号为"' + ids + '"的数据项？').then(function() {
        return delXdUserRechargeRecords(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('XdUserRechargeRecords/XdUserRechargeRecords/export', {
        ...this.queryParams
      }, `XdUserRechargeRecords_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
