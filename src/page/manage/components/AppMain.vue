<template>
  <!-- <section class="app-main"> -->
 <el-main>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
</el-main>
  <!-- </section> -->
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
};
</script>
