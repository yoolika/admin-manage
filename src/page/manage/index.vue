<template>
  <div class="app-wrapper">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="15%" style="min-width:200px;background-color:#324157">
        <sidebar class="sidebar-container"></sidebar>
      </el-aside>
      <el-container>
        <el-header style="padding:0px">
          <head-top></head-top>
        </el-header>
        <app-main></app-main>
      </el-container>
    </el-container>

  </div>
</template>
a
<script>
import AppMain from "@/page/manage/components/AppMain"; //页面布局的右侧区域
import sidebar from "@/components/sidebar"; //页面布局的左侧菜单
import headTop from "@/components/headTop";

export default {
  name: "layout",
  components: {
    sidebar,
    AppMain,
    headTop
  }
};
</script>

 <style lang="scss" scoped>
@import "@/style/sidebar";
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
