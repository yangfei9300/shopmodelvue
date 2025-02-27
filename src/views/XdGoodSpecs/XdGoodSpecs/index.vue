<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="商品ID" prop="goodId">
        <el-select v-model="queryParams.goodId" placeholder="请选择商品ID" clearable>
          <el-option
            v-for="dict in dict.type.shop_up_down"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格原价" prop="spacePrice">
        <el-input
          v-model="queryParams.spacePrice"
          placeholder="请输入规格原价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格优惠价" prop="spaceOriginalPrice">
        <el-input
          v-model="queryParams.spaceOriginalPrice"
          placeholder="请输入规格优惠价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.shop_up_down"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['XdGoodSpecs:XdGoodSpecs:add']"
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
          v-hasPermi="['XdGoodSpecs:XdGoodSpecs:edit']"
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
          v-hasPermi="['XdGoodSpecs:XdGoodSpecs:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['XdGoodSpecs:XdGoodSpecs:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="XdGoodSpecsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="商品ID" align="center" prop="goodId">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_up_down" :value="scope.row.goodId"/>
        </template>
      </el-table-column>
      <el-table-column label="规格名称" align="center" prop="specsName" />
      <el-table-column label="规格图片" align="center" prop="spaceImg" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.spaceImg" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="规格原价" align="center" prop="spacePrice" />
      <el-table-column label="规格优惠价" align="center" prop="spaceOriginalPrice" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_up_down" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="部门ID" align="center" prop="deptId" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['XdGoodSpecs:XdGoodSpecs:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['XdGoodSpecs:XdGoodSpecs:remove']"
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

    <!-- 添加或修改规格管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品ID" prop="goodId">
          <el-select v-model="form.goodId" placeholder="请选择商品ID">
            <el-option
              v-for="dict in dict.type.shop_up_down"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格名称" prop="specsName">
          <el-input v-model="form.specsName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="规格图片" prop="spaceImg">
          <image-upload v-model="form.spaceImg"/>
        </el-form-item>
        <el-form-item label="规格原价" prop="spacePrice">
          <el-input v-model="form.spacePrice" placeholder="请输入规格原价" />
        </el-form-item>
        <el-form-item label="规格优惠价" prop="spaceOriginalPrice">
          <el-input v-model="form.spaceOriginalPrice" placeholder="请输入规格优惠价" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="dict in dict.type.shop_up_down"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
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
import { listXdGoodSpecs, getXdGoodSpecs, delXdGoodSpecs, addXdGoodSpecs, updateXdGoodSpecs } from "@/api/XdGoodSpecs/XdGoodSpecs";

export default {
  name: "XdGoodSpecs",
  dicts: ['shop_up_down'],
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
      // 规格管理表格数据
      XdGoodSpecsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        goodId: null,
        specsName: null,
        spaceImg: null,
        spacePrice: null,
        spaceOriginalPrice: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询规格管理列表 */
    getList() {
      this.loading = true;
      listXdGoodSpecs(this.queryParams).then(response => {
        this.XdGoodSpecsList = response.rows;
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
        goodId: null,
        specsName: null,
        spaceImg: null,
        spacePrice: null,
        spaceOriginalPrice: null,
        status: null,
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加规格管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getXdGoodSpecs(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改规格管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateXdGoodSpecs(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addXdGoodSpecs(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除规格管理编号为"' + ids + '"的数据项？').then(function() {
        return delXdGoodSpecs(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('XdGoodSpecs/XdGoodSpecs/export', {
        ...this.queryParams
      }, `XdGoodSpecs_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
