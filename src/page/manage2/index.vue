<template>
    <div class="manage_page fillcontain">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="15%" style="min-width:200px;background-color:#324157">
                <el-menu :default-active="$route.path" 
                class="el-menu-vertical-demo" 
                @open="handleOpen" @close="handleClose" background-color="#324157" text-color="#bfcbd9" active-text-color="#ffd04b"
                router >
                    <el-menu-item index="manage">
                        <i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-document"></i>数据管理</template>
                        <el-menu-item index="userList">用户列表</el-menu-item>
                        <el-menu-item index="productList">商品列表</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="padding:0px">
                    <head-top></head-top>
                </el-header>

                <el-main>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import headTop from "@/components/headTop";
export default {
  components: {
    headTop
  },
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/style/mixin";
.manage_page {
}
.el-menu {
  border-right-width: 0px;
}
</style>
