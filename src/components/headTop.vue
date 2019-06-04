<template>
  <div class="header_container">
    <div>
      <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" v-if="item.meta.title">
          {{item.meta.title}}
          <!-- <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link> -->
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-dropdown @command="handleCommand">
        <!-- <span class="el-dropdown-link"> -->
        <img v-bind:src="headerIcon" :onerror="icon" class="avator">
        <!-- </span> -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="set">设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { baseImgPath } from "@/config/env";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      baseImgPath,
      levelList: null,
      icon: 'this.src="' + require("@/assets/img/default.jpg") + '"'
    };
  },
  computed: {
    ...mapGetters(["headerIcon"])
  },
  methods: {
    ...mapActions(["FedLogOut"]),
    /**
     * 生成面包屑的方法
     */
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      //   const first = matched[0];
      //   if (first && first.name !== "首页") {
      //     matched = [{ path: "/manage", meta: { title: "首页" } }].concat(matched);
      //   }
      this.levelList = matched;
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$confirm("是否退出系统?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.FedLogOut().then(res => {
              this.$message({
                type: "success",
                message: "退出成功!"
              });
              this.$router.push("/");
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退出"
            });
          });
      }
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  }
};
</script>
<style lang="scss">
@import "@/style/mixin";
.header_container {
  background-color: #eff2f7;
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  padding: 0 20px 0 20px;
}
.avator {
  @include wh(40px, 40px);
  border-radius: 50%;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
