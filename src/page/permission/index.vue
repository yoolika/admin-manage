<template>
  <div>
    <div class="filter-container">
      <el-row>
        <el-input v-model="select_word" placeholder="筛选关键词" style="width:15%;min-width:200px"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          @click="handeleAdd"
          v-has="{role : 'add'}"
        >添加</el-button>
      </el-row>
    </div>
    <div>
      <my-table
        :tableData="tableData"
        :columns="columns"
        :btnOptions="btnOptions"
        :tableOptions="tableOptions"
        :pagination="pagination"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></my-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" v-loading="dialogLoading">
        <el-form-item label="角色名称" label-width="100px" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="100px" prop="name">
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="id" label-width="100px" prop="address" v-if="false">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-transfer
            style="text-align: left; display: inline-block"
            :titles="['未选', '已选']"
            v-model="targetData"
            :data="sourceData"
          ></el-transfer>
        </div>
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
import { getRoleList, addUser } from "@/api/getData";
import { table, tableform } from "@/components/mixin";

export default {
  mixins: [table, tableform],
  data() {
    return {
      tableData: [],
      select_word: "",
      modelName: "权限",
      sourceData:[],
      targetData:[],
      form: {
        id:"",
        name: "",
        describe: "",
        selected:[]
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        describe: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      },
      columns: [
        {
          label: "角色名称",
          prop: "name"
        },
        {
          label: "创建日期",
          prop: "dateTime"
        },
        {
          label: "描述",
          prop: "describe",
          width: "350"
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
    getSearchCondition() {
      return {
        word: this.select_word
      };
    },
    requestList(options) {
      return getRoleList(options);
    },
    getRefsForm() {
      return this.$refs.form;
    },
    getTableData() {
      return this.tableData;
    },
    handleAddOperate() {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        });
      }
      this.sourceData = data;
    },
    async handleEditOperate(index, row) {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        });
      }
      this.sourceData = data;
      this.targetData = [1,4];
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
  },
  watch:{
    targetData:function(val){
      this.form.selected = val;
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
