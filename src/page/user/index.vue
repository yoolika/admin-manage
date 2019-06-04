<template>
  <div>
    <div class="filter-container">
      <el-row>
        <el-input v-model="select_word" placeholder="用户名" style="width:15%;min-width:200px"></el-input>
        <el-select v-model="selectValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          @click="handeleAdd"
          v-has="{role : 'add'}"
        >添加</el-button>
      </el-row>
    </div>
    <div class>
      <my-table
        :tableData="tableData"
        :columns="columns"
        :btnOptions="btnOptions"
        :options="options"
        :pagination="pagination"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></my-table>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" v-loading="dialogLoading">
        <el-form-item label="日期" label-width="100px" prop="dateTime">
          <el-date-picker v-model="form.dateTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" label-width="100px" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="100px" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="id" label-width="100px" prop="address" v-if="false">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="isAdd">确 定</el-button>
        <el-button type="danger" @click="save" v-if="!isAdd">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList, addUser } from "@/api/getData";
import { table, tableform } from "@/components/mixin";

export default {
  mixins: [table, tableform],

  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      selectValue: "",
      select_word: "",

      form: {
        name: "",
        dateTime: "",
        address: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        dateTime: [{ required: true, message: "请选择日期", trigger: "blur" }]
      },

      //以下都是封装table需要的参数
      columns: [
        {
          label: "姓名",
          prop: "name",
          formatter: (row, column, cellValue) => {
            return `<span style="white-space: nowrap;color: dodgerblue;">${
              row.name
            }</span>`;
          }
        },
        {
          label: "日期",
          prop: "dateTime"
          // ,
          // formatter: (row, column, cellValue) => {
          //     return this.$utils.Common.dateFormat(row.dateTime, 'YYYY年MM月DD日 hh:mm')
          //   }
        },
        {
          label: "地址",
          prop: "address"
        },
        {
          label: "状态",
          prop: "state",
          render: (h, {row, index}) => {
            //第一个参数：标签字符串
            //第二个参数：相关属性的数据对象 如style class prop
            //第三个参数：子节点
            // return h(
            //   "el-tag",
            //   {
            //     props: {
            //       type:
            //         row.state === 0
            //           ? "success"
            //           : row.state === 1
            //           ? "info"
            //           : "danger"
            //     } // el-tag组件的props
            //   },
            //   row.state === 0
            //     ? "正常"
            //     : row.state === 1
            //     ? "无效"
            //     : "审核中"
            // );
            let stateType =row.state === 0 ? "success": row.state === 1? "info": "danger"
            var state =row.state === 0 ? "正常": row.state === 1? "无效": "审核中"
            //JSX写法
            return (<el-tag type={stateType}>{state}</el-tag>)
          }
        }
      ],
      btnOptions: {
        label: "操作",
        options: [
          {
            label: "编辑",
            size: "small",
            methods: (index, row) => {
              this.handleEdit(index, row);
            },
            role: { role: "edit" }
          },
          {
            label: "删除",
            size: "small",
            type: "danger",
            methods: (index, row) => {
              this.handleDelete(index, row);
            },
            role: { role: "delete" }
          }
        ]
      }
    };
  },

  methods: {
    searchCondition() {
      return {
        word: this.select_word
      };
    },
    requestList(options) {
      return getUserList(options);
    },
    getRefsForm() {
      return this.$refs.form;
    },
    getTableData() {
      return this.tableData;
    },
    requestAdd(form) {
      return addUser(form);
    },
    requestEdit(form) {
      return addUser(form);
    },
    requestDelete(form) {
      return addUser(form);
    }
  }
};
</script>



<style lang="scss" scoped>
@import "@/style/mixin";
.filter-container {
  margin-bottom: 20px;
}
</style>
