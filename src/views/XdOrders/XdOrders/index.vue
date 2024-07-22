<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="uId">
        <el-input v-model="queryParams.uId" placeholder="请输入用户ID" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="订单编号" prop="orderNumber">
        <el-input v-model="queryParams.orderNumber" placeholder="请输入订单编号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择订单状态" clearable>
          <el-option v-for="dict in dict.type.shop_order_status" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>

       </el-form-item>
            <el-form-item label="收件人姓名" label-width="100px" prop="addressName">
              <el-input
                v-model="queryParams.addressName"
                placeholder="请输入收件人姓名"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>

             <el-form-item label="收件人电话"  label-width="100px" prop="addressPhone">
                    <el-input
                      v-model="queryParams.addressPhone"
                      placeholder="请输入收件人电话"
                      clearable
                      @keyup.enter.native="handleQuery"
                    />
                  </el-form-item>

      <el-form-item label="收货地址" prop="address">
        <el-input v-model="queryParams.address" placeholder="请输入收货地址" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>



      <el-form-item label="详细地址" prop="addressInfo">
        <el-input v-model="queryParams.addressInfo" placeholder="请输入详细地址" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="配送方式" prop="shippingMethod">
        <el-select v-model="queryParams.shippingMethod" placeholder="请选择配送方式" clearable>
          <el-option v-for="dict in dict.type.shop_send_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="物流名称" prop="logisticsName">
        <el-input v-model="queryParams.logisticsName" placeholder="请输入物流名称" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="物流编号" prop="logisticsCode">
        <el-input v-model="queryParams.logisticsCode" placeholder="请输入物流编号" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="支付方式" prop="paymentMethod">
        <el-select v-model="queryParams.paymentMethod" placeholder="请选择支付方式" clearable>
          <el-option v-for="dict in dict.type.shop_pay_type" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
     <!-- <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['XdOrders:XdOrders:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['XdOrders:XdOrders:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['XdOrders:XdOrders:remove']">删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['XdOrders:XdOrders:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="XdOrdersList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />



      <!-- <el-table-column label="用户ID" align="center" prop="uId" /> -->
      <el-table-column label="订单编号" align="center" prop="orderNumber" />

      <!-- <el-table-column label="支付时间" align="center" prop="payTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.payTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发货时间" align="center" prop="sendTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.sendTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收货时间" align="center" prop="putTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.putTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评价时间" align="center" prop="commTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.commTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地址ID" align="center" prop="addressId" /> -->
      <el-table-column label="订单状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_order_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="收货地址" align="center" prop="address" />
      <el-table-column label="收件人电话" align="center" prop="addressPhone" />

      <!-- <el-table-column label="详细地址" align="center" prop="addressInfo" /> -->
      <el-table-column label="配送方式" align="center" prop="shippingMethod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_send_type" :value="scope.row.shippingMethod" />
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center" prop="paymentMethod">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.shop_pay_type" :value="scope.row.paymentMethod" />
        </template>
      </el-table-column>


      <el-table-column label="物流名称" align="center" prop="logisticsName" />
      <el-table-column label="物流编号" align="center" prop="logisticsCode" />

      <el-table-column label="订单总价" align="center" prop="totalAmount" />
      <el-table-column label="优惠券优惠的金额" align="center" prop="couponMoney" />
      <el-table-column label="最终价格" align="center" prop="endMoney" />
      <!-- <el-table-column label="优惠券ID" align="center" prop="couponId" /> -->
      <el-table-column label="备注" align="center" prop="notes" />
      <el-table-column label="订单创建时间" align="center" prop="orderDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['XdOrders:XdOrders:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['XdOrders:XdOrders:remove']">删除</el-button> -->
          <el-button size="mini" type="text" icon="el-icon-rank"
            @click="openInfoShowClick(scope.row)">查看详情</el-button>
          <el-button size="mini" type="text" icon="el-icon-attract"
            @click="openExpressDeliveryAlertClick(scope.row)">点击发货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="uId">
          <el-input v-model="form.uId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="订单编号" prop="orderNumber">
          <el-input v-model="form.orderNumber" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="订单创建时间" prop="orderDate">
          <el-date-picker clearable v-model="form.orderDate" type="date" value-format="yyyy-MM-dd"
            placeholder="请选择订单创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付时间" prop="payTime">
          <el-date-picker clearable v-model="form.payTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择支付时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发货时间" prop="sendTime">
          <el-date-picker clearable v-model="form.sendTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择发货时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收货时间" prop="putTime">
          <el-date-picker clearable v-model="form.putTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择收货时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评价时间" prop="commTime">
          <el-date-picker clearable v-model="form.commTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择评价时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择订单状态">
            <el-option v-for="dict in dict.type.shop_order_status" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址ID" prop="addressId">
          <el-input v-model="form.addressId" placeholder="请输入地址ID" />
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入收货地址" />
        </el-form-item>
          <el-form-item label="收件人电话" prop="addressPhone">
          <el-input v-model="form.addressPhone" placeholder="请输入收件人电话" />
        </el-form-item>
        <el-form-item label="详细地址" prop="addressInfo">
          <el-input v-model="form.addressInfo" placeholder="请输入详细地址" />
        </el-form-item>

        <el-form-item label="物流名称" prop="logisticsName">
          <el-input v-model="form.logisticsName" placeholder="请输入物流名称" />
        </el-form-item>
        <el-form-item label="物流编号" prop="logisticsCode">
          <el-input v-model="form.logisticsCode" placeholder="请输入物流编号" />
        </el-form-item>

        <el-form-item label="配送方式" prop="shippingMethod">
          <el-select v-model="form.shippingMethod" placeholder="请选择配送方式">
            <el-option v-for="dict in dict.type.shop_send_type" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-select v-model="form.paymentMethod" placeholder="请选择支付方式">
            <el-option v-for="dict in dict.type.shop_pay_type" :key="dict.value" :label="dict.label"
              :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单总价" prop="totalAmount">
          <el-input v-model="form.totalAmount" placeholder="请输入订单总价" />
        </el-form-item>
        <el-form-item label="优惠券优惠的金额" prop="couponMoney">
          <el-input v-model="form.couponMoney" placeholder="请输入优惠券优惠的金额" />
        </el-form-item>
        <el-form-item label="最终价格" prop="endMoney">
          <el-input v-model="form.endMoney" placeholder="请输入最终价格" />
        </el-form-item>
        <el-form-item label="优惠券ID" prop="couponId">
          <el-input v-model="form.couponId" placeholder="请输入优惠券ID" />
        </el-form-item>
        <el-form-item label="备注" prop="notes">
          <el-input v-model="form.notes" type="textarea" placeholder="请输入内容" />
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

    <el-dialog title="发快递" :visible.sync="openExpressDeliveryAlert" width="50%" append-to-body>
      <div class="colonn">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="物流名称" prop="logisticsName">
            <el-input v-model="form.logisticsName" placeholder="请输入物流名称" />
          </el-form-item>
          <el-form-item label="物流编号" prop="logisticsCode">
            <el-input v-model="form.logisticsCode" placeholder="请输入物流编号" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormSend">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="订单详情" :visible.sync="openInfoShow" width="80%" append-to-body>
      <div class="colonn">
        <div style="font-size: 20px;font-weight: bold;">订单信息</div>
        <div>
          <el-row :gutter="20" style="padding-top:10px;">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                订单编号：{{orderInfo.info.orderNumber}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple roww center_center">
                  <div>订单状态：</div>
                  <dict-tag :options="dict.type.shop_order_status" :value="orderInfo.info.status" />
                  <div class="allline"></div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple roww center_center">
                  <div>配送方式：</div>
                  <dict-tag :options="dict.type.shop_send_type" :value="orderInfo.info.shippingMethod" />
                  <div class="allline"></div>
                </div>
              </div>

            </el-col>
            <el-col :span="6">
              <!-- <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  支付方式：微信支付
                </div>
              </div>
              <el-select v-model="queryParams.paymentMethod" placeholder="请选择支付方式" clearable>
                <el-option v-for="dict in dict.type.shop_pay_type" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select> -->

              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple roww center_center">
                  <div>支付方式：</div>
                  <dict-tag :options="dict.type.shop_pay_type" :value="orderInfo.info.paymentMethod" />
                  <div class="allline"></div>
                </div>
              </div>



            </el-col>


          </el-row>
          <el-row :gutter="20" style="padding-top:10px ;">
            <el-col :span="6">
              <div class="grid-content bg-purple"> 下单时间：{{orderInfo.info.orderDate}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"> 支付时间：{{orderInfo.info.payTime}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"> 发货时间：{{orderInfo.info.sendTime}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"> 收货时间：{{orderInfo.info.putTime}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="padding-top:10px ;">
            <el-col :span="6">
              <div class="grid-content bg-purple"> 评价时间：{{orderInfo.info.commTime}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"> 备注：{{orderInfo.info.notes}}</div>
            </el-col>
          </el-row>
          <div style="height: 10px;"></div>
        </div>
        <div style="font-size: 20px;font-weight: bold;">物流信息</div>

        <div>
          <el-row :gutter="20" style="padding-top:10px;">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                物流名称：{{orderInfo.info.logisticsName}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                物流编号：{{orderInfo.info.logisticsCode}}
              </div>
            </el-col>
          </el-row>

          <div style="height: 10px;"></div>
        </div>
        <div style="font-size: 20px;font-weight: bold;">优惠信息</div>
        <div>
          <el-row :gutter="20" style="padding-top:10px;">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                订单总金额：￥{{orderInfo.info.totalAmount}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                优惠券金额：{{orderInfo.info.couponMoney}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                支付金额：￥{{orderInfo.info.endMoney}}
              </div>
            </el-col>
            <!-- <el-col :span="6">
              <div class="grid-content bg-purple">
                优惠券信息：
              </div>
            </el-col> -->
          </el-row>

          <div style="height: 10px;"></div>
        </div>


        <div style="font-size: 20px;font-weight: bold;">收货地址</div>

        <div>
          <el-row :gutter="20" style="padding-top:10px;">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                姓名：{{orderInfo.info.addressName}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                省：{{orderInfo.info.address}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                市：{{orderInfo.info.address}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                区：{{orderInfo.info.address}}
              </div>
            </el-col>

          </el-row>
          <el-row :gutter="20" style="padding-top:10px;">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                收货地址：{{orderInfo.info.addressInfo}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                联系电话：{{orderInfo.info.addressPhone}}
              </div>
            </el-col>

          </el-row>

          <div style="height: 10px;"></div>
        </div>


        <div style="font-size: 20px;font-weight: bold;">商品信息</div>
        <div style="height: 10px;"></div>
        <el-table :data="orderInfo.goodList" border style="width: 100%">

          <el-table-column label="商品图" align="center" prop="avatar" width="100">
            <template slot-scope="scope">
              <image-preview :src="scope.row.specsImg" :width="50" :height="50" />
            </template>
          </el-table-column>

          <el-table-column prop="productName" label="商品名称" width="180">
          </el-table-column>
          <el-table-column prop="specsName" label="规格名称" width="180">
          </el-table-column>
          <el-table-column prop="specsPrice" label="价格">
          </el-table-column>
          <el-table-column prop="quantity" label="数量">
          </el-table-column>
          <el-table-column prop="finalPrice" label="总价">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>





  </div>
</template>

<script>
  import {
    listXdOrders,
    getXdOrders,
    delXdOrders,
    addXdOrders,
    updateXdOrders,
    sendGoods,
  } from "@/api/XdOrders/XdOrders";

  export default {
    name: "XdOrders",
    dicts: ['shop_send_type', 'shop_order_status', 'shop_pay_type'],
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
        // 订单表格数据
        XdOrdersList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 是否显示订单详情
        openInfoShow: false,
        openExpressDeliveryAlert: false, //发快递弹窗
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          uId: null,
          orderNumber: null,
          status: null,
          address: null,
          addressName:null,
          addressPhone:null,
          addressInfo: null,

          logisticsName: null,
          logisticsCode: null,

          shippingMethod: null,
          paymentMethod: null,
          notes: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {},




        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],

        orderInfo:{
          'info':{},
          'goodList':[]
        }

      };
    },
    created() {
      this.getList();
    },
    methods: {
      // 发快递显示弹窗
      openExpressDeliveryAlertClick(row) {
         const id = row.id
        getXdOrders(id).then(response => {
          this.form = response.data;
          this.openExpressDeliveryAlert = true;
        });
      },
      // 订单详情
      openInfoShowClick(row) {
        getXdOrders(row.id).then(response => {
          this.form = response.data;
          this.orderInfo.info=response.data;
          if(response.data.params&&response.data.params.goods){
            this.orderInfo.goodList=response.data.params.goods;
          }
          this.openInfoShow = !this.openInfoShow;
        });

      },


      /** 查询订单列表 */
      getList() {
        this.loading = true;
        listXdOrders(this.queryParams).then(response => {
          this.XdOrdersList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
         this.openExpressDeliveryAlert=false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          uId: null,
          orderNumber: null,
          orderDate: null,
          payTime: null,
          sendTime: null,
          putTime: null,
          commTime: null,
          status: null,
          addressId: null,
          address: null,
          addressName:null,
          addressPhone:null,
          addressInfo: null,
          shippingMethod: null,
          paymentMethod: null,
          totalAmount: null,

          logisticsName: null,
          logisticsCode: null,

          couponMoney: null,
          endMoney: null,
          couponId: null,
          notes: null,
          updateTime: null,
          createTime: null,
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
        this.title = "添加订单";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getXdOrders(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改订单";
        });
      },
      submitFormSend() {
        var data =this.form
        sendGoods(data).then(response => {
          this.$modal.msgSuccess("发货成功");
          this.open = false;
          this.openExpressDeliveryAlert = false;
          this.getList();
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateXdOrders(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.openExpressDeliveryAlert=false;
                this.getList();
              });
            } else {
              addXdOrders(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除订单编号为"' + ids + '"的数据项？').then(function() {
          return delXdOrders(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('XdOrders/XdOrders/export', {
          ...this.queryParams
        }, `XdOrders_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>
