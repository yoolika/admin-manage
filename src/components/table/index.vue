<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      highlight-current-row
      v-loading="tableOptions.loading"
    >
      <el-table-column type="index" width="100"></el-table-column>
      <template v-for=" (column,index) in columns">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
          :key="index"
        >
          <!--slot-scope="scope" 指的是element子组件的数据 -->
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row,column)"></span>
              </template>
              <template v-else>
                <span>{{scope.row[column.prop]}}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"></expand-dom>
            </template>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" width="160" v-if="btnOptions.options.length > 0">
        <template slot-scope="scope">
          <el-button
            v-for="(item,index) in btnOptions.options"
            :key="index"
            :size="item.size"
            :type="item.type"
            v-has="item.role"
            @click.native.prevent="item.methods(index,scope.row)"
          >{{item.label}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="pagination.count"
      :page-size="pagination.pageSize"
      :current-page="pagination.currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pagination"
    ></el-pagination>
  </div>
</template>
<script>
import { pageSize } from "@/config/env";
export default {
  name: "myTable",
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        };
         (ctx.props.column)? params.column : ctx.props.column;
        return ctx.props.render(h, params);
      }
    }
  },
  //也可以下面这种写法
  //  components: {
  //     expandDom: {
  //       props: {
  //         column: {
  //           type:Object,
  //           default: null
  //         },
  //         row: {
  //           type:Object,
  //           required: true
  //         },
  //         render:Function,
  //         index:Number
  //       },
  //       render (h) {
  //         return h('div', {}, ([this.column.render(h, this.row)]))
  //       }
  //    }
  //  },
  // 使用：
            // render:(h, params) => {
          //     return h('el-tag', {
          //       props: {type: params.state === 0 ? 'success' : params.state === 1 ? 'info' : 'danger'} // 组件的props
          //     }, params.state === 0 ? '正常' : params.state === 1 ? '无效' : '审核中')
          //   }
  props: {
    columns: {
      type: Array,// prop:表头绑定的地段，label：表头名称，align：每列数据展示形式（left, center, right），width:列宽
      default: ()=>{
        return []
      }
    }, //列
    tableData: {
      type: Array,
      default:()=>{
        return []
      }
    }, //数据
    btnOptions: {
      type: Object,
      default:()=>{
        return {}
      }
    }, //操作按钮权限
    tableOptions: {
      type: Object,
      default: () => {
        return {
          stripe: false, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: false, // 是否支持当前行高亮显示
          mutiSelect: false // 是否支持列表项选中功能
        };
      } // table 表格的控制参数
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          currentPage: 1, //页面上当前第几页
          count: 0, //总数
          pageSize //每页显示
        };
      }
    }
  },
  methods: {
    //@size-change="handleSizeChange"触发该方法
    handleCurrentChange(val) {
      //这里触发的是父组件的  @handleCurrentChange="handleCurrentChange"
      this.$emit("handleCurrentChange", val);
    },
    handleSizeChange(val) {
      console.log(22);
      this.$emit("handleSizeChange", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
}
</style>

