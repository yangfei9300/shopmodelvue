<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入商品名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="分类ID" prop="categoryId">
        <el-select v-model="queryParams.categoryId" placeholder="请选择分类ID" clearable>
          <el-option v-for="dict in dict.type.banners_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="库存" prop="inventory">
        <el-input v-model="queryParams.inventory" placeholder="请输入库存" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="queryParams.sort" placeholder="请输入排序" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-input v-model="queryParams.tag" placeholder="请输入标签" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="备注" prop="notes">
        <el-input v-model="queryParams.notes" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option v-for="dict in dict.type.shop_up_down" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="是否可使用优惠券" prop="isCoupon">
        <el-select v-model="queryParams.isCoupon" placeholder="请选择是否可使用优惠券" clearable>
          <el-option v-for="dict in dict.type.shop_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="是否是新品" label-width="100px" prop="isNew">
        <el-select v-model="queryParams.isNew" placeholder="请选择是否是新品" clearable>
          <el-option v-for="dict in dict.type.shop_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否推荐" prop="isRecommend">
        <el-select v-model="queryParams.isRecommend" placeholder="请选择是否推荐" clearable>
          <el-option v-for="dict in dict.type.shop_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['XdProducts:XdProducts:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['XdProducts:XdProducts:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['XdProducts:XdProducts:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['XdProducts:XdProducts:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="XdProductsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="商品名称" align="center" prop="name" />
      <el-table-column label="商品主图" align="center" prop="img" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.img" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="商品轮播图" align="center" prop="banners" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.banners" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" align="center" prop="description" />
      <!-- <el-table-column label="商品描述富文本" align="center" prop="descriptionHtml" /> -->
      <el-table-column label="分类ID" align="center" prop="categoryId">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.banners_type" :value="scope.row.categoryId" />
        </template>
      </el-table-column>
      <el-table-column label="商品原价" align="center" prop="price" />
      <el-table-column label="优惠价格" align="center" prop="preferentialPrice" />
      <el-table-column label="库存" align="center" prop="inventory" />
      <el-table-column label="排序" align="center" prop="sort" />
      <el-table-column label="标签" align="center" prop="tag" />
      <el-table-column label="备注" align="center" prop="notes" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_up_down" :value="scope.row.status" />
        </template>
      </el-table-column>
     <!-- <el-table-column label="是否可使用优惠券" align="center" prop="isCoupon">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_status" :value="scope.row.isCoupon" />
        </template>
      </el-table-column> -->
      <el-table-column label="是否是新品" align="center" prop="isNew">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_status" :value="scope.row.isNew" />
        </template>
      </el-table-column>
      <el-table-column label="是否推荐" align="center" prop="isRecommend">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_status" :value="scope.row.isRecommend" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['XdProducts:XdProducts:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['XdProducts:XdProducts:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum"
    :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改商品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="分类ID" prop="categoryId">
              <el-select v-model="form.categoryId" placeholder="请选择分类ID">
                <el-option v-for="dict in goodTypeList"
                :key="dict.id" :label="dict.typeName"
                  :value="parseInt(dict.id)"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="form.sort" placeholder="请输入排序" />
            </el-form-item>
            <el-form-item label="标签" prop="tag">
              <el-input v-model="form.tag" placeholder="请输入标签" />
            </el-form-item>
            <el-form-item label="备注" prop="notes">
              <el-input v-model="form.notes" placeholder="请输入备注" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option v-for="dict in dict.type.shop_up_down" :key="dict.value" :label="dict.label"
                  :value="parseInt(dict.value)"></el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="销售">
            <el-form-item label="商品原价" prop="price">
              <el-input v-model="form.price" placeholder="请输入商品原价" />
            </el-form-item>
            <el-form-item label="优惠价格" prop="preferentialPrice">
              <el-input v-model="form.preferentialPrice" placeholder="请输入优惠价格" />
            </el-form-item>
            <el-form-item label="库存" prop="inventory">
              <el-input v-model="form.inventory" placeholder="请输入库存" />
            </el-form-item>
            <!-- <el-form-item label="是否可使用优惠券" prop="isCoupon">
              <el-select v-model="form.isCoupon" placeholder="请选择是否可使用优惠券">
                <el-option v-for="dict in dict.type.shop_status" :key="dict.value" :label="dict.label"
                  :value="parseInt(dict.value)"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="是否是新品" prop="isNew">
              <el-select v-model="form.isNew" placeholder="请选择是否是新品">
                <el-option v-for="dict in dict.type.shop_status" :key="dict.value" :label="dict.label"
                  :value="parseInt(dict.value)"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否推荐" prop="isRecommend">
              <el-select v-model="form.isRecommend" placeholder="请选择是否推荐">
                <el-option v-for="dict in dict.type.shop_status" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品简介">
            <el-form-item label="商品描述" prop="description">
              <el-input v-model="form.description" placeholder="请输入商品描述" />
            </el-form-item>
            <el-form-item label="商品描述富文本">
              <editor v-model="form.descriptionHtml" :min-height="192" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="媒体管理">
            <el-form-item label="商品主图" prop="img">
              <image-upload :limit="1" v-model="form.img" />
            </el-form-item>
            <el-form-item label="商品轮播图" prop="banners">
              <image-upload v-model="form.banners" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="规格管理">
            <div class="colonn">
              <div class="roww" v-for="(item,index) in XdGoodSpecsList.length">
                <el-form-item label="规格主图" prop="img">
                  <image-upload :limit="1" v-model="XdGoodSpecsList[index].spaceImg" />
                </el-form-item>
                <el-form-item label="规格名称">
                  <el-input placeholder="请输入" v-model="XdGoodSpecsList[index].specsName"></el-input>
                </el-form-item>
                <el-form-item label="规格原价">
                  <el-input placeholder="请输入"  v-model="XdGoodSpecsList[index].spacePrice"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="count">
                  <el-input placeholder="请输入"  v-model="XdGoodSpecsList[index].count"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="规格优惠价"  >
                  <el-input placeholder="请输入" v-model="XdGoodSpecsList[index].spaceOriginalPrice"></el-input>
                </el-form-item>
                <el-form-item label="是否上架">
                  <el-select  v-model="XdGoodSpecsList[index].status"  placeholder="请选择是否推荐">
                    <el-option v-for="dict in dict.type.shop_status" :key="dict.value" :label="dict.label"
                      :value="dict.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div @click="addSpecs" style="color: white;background-color: red;width:200px;"> 新增规格</div>
            </div>
          </el-tab-pane>
        </el-tabs>

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
    listXdProducts,
    getXdProducts,
    delXdProducts,
    addXdProducts,
    updateXdProducts
  } from "@/api/XdProducts/XdProducts";

  import { listXdGoodSpecs } from "@/api/XdGoodSpecs/XdGoodSpecs";
import { listXdCategories } from "@/api/XdCategories/XdCategories";


  export default {
    name: "XdProducts",
    dicts: ['banners_type', 'shop_status', 'shop_up_down'],
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
        // 商品表格数据
        XdProductsList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          name: null,
          categoryId: null,
          inventory: null,
          sort: null,
          tag: null,
          notes: null,
          status: null,
          isCoupon: null,
          isNew: null,
          isRecommend: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
           name: [
                    { required: true, message: "商品名称不能为空", trigger: "blur" }
                  ],
                  img: [
                    { required: true, message: "商品主图不能为空", trigger: "blur" }
                  ],
                  banners: [
                    { required: true, message: "商品轮播图不能为空", trigger: "blur" }
                  ],
                  description: [
                    { required: true, message: "商品描述不能为空", trigger: "blur" }
                  ],
                  descriptionHtml: [
                    { required: true, message: "商品描述富文本不能为空", trigger: "blur" }
                  ],
                  categoryId: [
                    { required: true, message: "分类ID不能为空", trigger: "change" }
                  ],
                  price: [
                    { required: true, message: "商品原价不能为空", trigger: "blur" }
                  ],
                  preferentialPrice: [
                    { required: true, message: "优惠价格不能为空", trigger: "blur" }
                  ],
                  inventory: [
                    { required: true, message: "库存不能为空", trigger: "blur" }
                  ],
                  status: [
                    { required: true, message: "状态不能为空", trigger: "change" }
                  ],
                  // isCoupon: [
                  //   { required: true, message: "是否可使用优惠券不能为空", trigger: "change" }
                  // ],
                  isNew: [
                    { required: true, message: "是否是新品不能为空", trigger: "change" }
                  ],
                  isRecommend: [
                    { required: true, message: "是否推荐不能为空", trigger: "change" }
                  ],
        },
        // 规格列表
        XdGoodSpecsList:[],
        goodTypeList:[],//商品分类列表
      };
    },
    created() {
      this.getList();
      this.getListXdCategories()
    },
    methods: {

      // --------------------------规格----------------------------
      /** 查询商品列表 */
      getList() {
        this.loading = true;
        listXdProducts(this.queryParams).then(response => {
          this.XdProductsList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      getListXdCategories(){

        listXdCategories({}).then(response => {
          this.goodTypeList = response.rows;
        });
      },
      // 查询商品规格通过ID
      getListXdGoodSpecs(goodId){
        var data={
          goodId:goodId,
          pageNum: 1,
          pageSize: 100,
        }
        listXdGoodSpecs(data).then(response => {
          console.log("规格列表")
          var list=response.rows;
          for(var a=0;a<list.length;a++){
            list[a].status=""+list[a].status
          }
          this.XdGoodSpecsList = list;
        });
      },
      //规格的加号
      addSpecs(){
        var obg={
          goodId: this.form.id,
          specsName: "",
          spaceImg: null,
          spacePrice: null,
          spaceOriginalPrice: null,
          status: null,
          count:1,
        }
        this.XdGoodSpecsList.push(obg);
      },
      isSubmit(){
        var  XdGoodSpecsList=this.XdGoodSpecsList;
        var isStrue=true;
        for(var a=0;a<XdGoodSpecsList.length;a++){
          var obg=XdGoodSpecsList[a];
          if(obg.specsName==""||obg.spaceImg==""||obg.spacePrice==""||obg.spaceOriginalPrice==""){
            isStrue=false;
          }
        }
        if(XdGoodSpecsList.length<=0){
          isStrue= false;
        }
        return isStrue;
      },

      // --------------------------规格----------------------------

      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          name: null,
          img: null,
          banners: null,
          description: null,
          descriptionHtml: null,
          categoryId: null,
          price: null,
          preferentialPrice: null,
          inventory: null,
          sort: null,
          tag: null,
          notes: null,
          status: null,
          isCoupon: null,
          isNew: null,
          isRecommend: null,
          createTime: null,
          updateTime: null,
          deptId: null,
          userId: null,
          params:{}
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
        this.title = "添加商品";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getXdProducts(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改商品";
          this.getListXdGoodSpecs(id)
        });
      },
      /** 提交按钮 */
      submitForm() {
        if(!this.isSubmit()){
          this.$modal.msgError("请完善规格");
          return false;
        }
        if(this.form.params){
          this.form.params.xdGoodSpecsList=this.XdGoodSpecsList;
        }else{
          this.form.params={'xdGoodSpecsList':this.XdGoodSpecsList};
        }
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateXdProducts(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addXdProducts(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除商品编号为"' + ids + '"的数据项？').then(function() {
          return delXdProducts(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('XdProducts/XdProducts/export', {
          ...this.queryParams
        }, `XdProducts_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
