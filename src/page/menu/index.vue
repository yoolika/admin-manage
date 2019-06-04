<template>
  <div style="display:block">
    <el-tree
      :data="menuList"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
      v-loading="loading"
      ref="tree"
    ></el-tree>

    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @open="show()"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        v-loading="dialogLoading"
      >

        <el-form-item
          label="name"
          label-width="100px"
          prop="name"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="path"
          label-width="100px"
          prop="path"
        >
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item
          label="component"
          label-width="100px"
          prop="component"
          v-if="isMenu"
        >
          <el-input v-model="form.component"></el-input>
        </el-form-item>
        <el-form-item
          label="permission"
          label-width="100px"
          prop="permission"
        >
          <el-input v-model="form.permission"></el-input>
        </el-form-item>
        <el-form-item
          label="id"
          label-width="100px"
          prop="id"
          v-if="false"
        >
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item
          label="type"
          label-width="100px"
          prop="type"
          v-if="false"
        >
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item
          label="parentId"
          label-width="100px"
          prop="parentId"
          v-if="false"
        >
          <el-input v-model="form.parentId"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="danger"
          @click="save"
        >保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenu, addUser } from "@/api/getData";
export default {
  data() {
    const data = [
      {
        id: 0,
        name: "系统",
        type: 1,
        children: []
      }
    ];
    return {
      menuList: [],
      loading: false,
      title: "",
      isMenu: false,
      form: {
        name: "",
        path: "",
        component: "",
        permission: "",
        type: "",
        parentId: ""
      },
      rules: {
        name: [{ required: true, message: "请输入name", trigger: "blur" }],
        path: [{ required: true, message: "请输入path", trigger: "blur" }],
        component: [
          { required: true, message: "请输入component", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      dialogLoading: false,
      currentNode: null,
      saveType: 0 //0-保存下级节点 1-保存下级菜单 2-保存
    };
  },

  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getList();
    },
    async getList() {
      try {
        this.loading = true;
        const res = await getMenu();

        if (res.result == 200) {
          this.loading = false;
          const data = [
            {
              id: 0,
              name: "系统",
              type: 1,
              children: res.data
            }
          ];
          this.menuList = JSON.parse(JSON.stringify(data));
        } else {
          this.loading = false;
        }
      } catch (error) {
        this.$message.error("出错了哦！" + error.msg);
        this.loading = false;
      }
    },
    append(node) {
      this.isMenu = false;
      this.title = "添加节点";
      this.form.component = "Layout";
      this.dialogFormVisible = true;
      this.form.type = "1";
      this.form.parentId = "0";
      this.currentNode = node;
      this.saveType = 0;
    },
    appendMenu(node) {
      this.isMenu = true;
      this.form = {};
      this.title = "添加下级菜单";
      this.dialogFormVisible = true;
      this.form.type = "0";
      this.form.parentId = node.data.id;
      this.currentNode = node;
      this.saveType = 1;
    },
    sibling(node) {
      this.isMenu = true;
      this.form = {};
      this.title = "添加同级菜单";
      this.dialogFormVisible = true;
      this.form.type = "0";
      this.form.parentId = node.parent.data.id;
      this.currentNode = node;
      this.saveType = 2;
    },
    show() {
      this.$nextTick(function() {
        // console.log(this.$refs.tree);
      });
    },
    save() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.dialogLoading = true;
            const response = await addUser(this.form);
            this.dialogLoading = false;
            if (response.result == 200) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.dialogFormVisible = false;
              if (this.saveType == 0) {
              }
              const newChild = {
                id: 116,
                name: this.form.name,
                type: this.form.type,
                children: []
              };
              if (!this.currentNode.data.children) {
                this.$set(data, "children", []);
              }
              this.currentNode.data.children.push(newChild);
            } else {
              this.$message.error("出错了哦！");
            }
          } catch (error) {
            this.dialogLoading = false;
            this.$message.error("出错了哦！");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    renderContent(h, { node, data, store }) {
      // console.log(node)
      if (data.id == 0) {
        return (
          <span class="custom-tree-node">
            <span>{data.name}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.append(node)}
              >
                添加下级节点
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.appendMenu(node)}
              >
                添加下级菜单
              </el-button>
            </span>
          </span>
        );
      } else {
        if (data.type == 0) {
          return (
            <span class="custom-tree-node">
              <span>{data.name}</span>
              <span>
                <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.sibling(node)}
                >
                  添加同级菜单
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.removeMenu(node)}
                >
                  删除菜单
                </el-button>
              </span>
            </span>
          );
        } else {
          return (
            <span class="custom-tree-node">
              <span>{data.name}</span>
              <span>
                <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.appendMenu(node)}
                >
                  添加下级菜单
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.remove(node)}
                >
                  删除节点
                </el-button>
              </span>
            </span>
          );
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/style/mixin";
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 280px;
}
</style>


