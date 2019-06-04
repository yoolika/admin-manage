<template>
      <el-menu mode="vertical"  :default-active="$route.path" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
</template>

<script>
import sidebarItem from "./sidebarItem";

export default {
  components: { sidebarItem },
  computed: {
    routes() {
      return global.antRouter;
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
