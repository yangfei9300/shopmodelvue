<template>
  <div class="dashboard-editor-container">

    <panel-group v-if="tongjiSum" :data1="tongjiSum" @handleSetLineChartData="handleSetLineChartData" />

    <el-row v-if="dataBottom.length>0" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :dataBottom="dataBottom" :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col> -->


      <el-col :xs="24" :sm="24" :lg="8" v-if="seriesData.length>0">
        <div class="chart-wrapper">
            <div>商品销售占比</div>
          <pie-chart :legendData="legendData" :seriesData="seriesData" />
        </div>
      </el-col>


      <el-col :xs="24" :sm="24" :lg="16" v-if="seriesDateBar.length>0">

        <div class="chart-wrapper">
          <bar-chart :xAxisDataBar="xAxisDataBar" :seriesDateBar="seriesDateBar" />
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'

import { getHomeSums,
getGoodSaleProportion,
getMonthSales,
getWeekSales,
} from "@/api/index/index";

// const lineChartData = {
//   newVisitis: {
//     expectedData: [1000, 120, 161, 134, 105, 160, 165]
//   }
// }

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: {'expectedData':[]},
      tongjiSum:null,
      GoodSaleProportion:null,
      seriesData:[],
      legendData:[],
      dataBottom:[],

      seriesDateBar:[],
      xAxisDataBar:[],
    }
  },
  created() {
    this.getgetHomeSums();
  },
  methods: {
    getgetHomeSums(){
      getHomeSums(this.queryParams).then(response => {
        console.log("getHomeSums",response)
        this.tongjiSum=response.data;
      });
      getGoodSaleProportion({}).then(response => {
        console.log("GoodSaleProportion",response)
        this.GoodSaleProportion=response.data;
        var seriesData=[];
        var legendData=[];
        for(var a=0;a<this.GoodSaleProportion.length;a++){
          // var obg={'value':this.GoodSaleProportion[a].total_sales,'name':this.GoodSaleProportion[a].name+"("+this.GoodSaleProportion[a].sales_percentage+"%)"};
         var obg={'value':this.GoodSaleProportion[a].total_sales,'name':this.GoodSaleProportion[a].name};


          seriesData.push(obg)
          legendData.push(this.GoodSaleProportion[a].name);
        }
        this.legendData=legendData;
        this.seriesData=seriesData;
        console.log("aa",this.legendData,this.seriesData)
      });

      getMonthSales({}).then(response => {
        console.log("getMonthSales",response)
        var list=response.data;
        var dataBottom=[]
        var moneys=[];
        for(var a=0;a<list.length;a++){
          dataBottom.push(list[a].date);
          moneys.push(list[a].money);
        }
        console.log("--",moneys,dataBottom)
        this.lineChartData.expectedData=moneys;
        this.dataBottom=dataBottom;
      });
      getWeekSales({}).then(response => {
        console.log("getMonthSales",response)
        var list=response.data;
        var xAxisDataBar=[]
        var seriesDateBar=[];
        var week=['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
        for(var a=0;a<list.length;a++){
          xAxisDataBar.push(list[a].date+"("+week[a]+")");
          seriesDateBar.push(list[a].money);
        }
         this.xAxisDataBar=xAxisDataBar;
       this.seriesDateBar=seriesDateBar;

      });



    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
