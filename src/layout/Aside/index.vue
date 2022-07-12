<template>
  <!-- <div class="aside-container"> -->
  <el-menu
    default-active="/home"
    background-color="#303133"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <!-- <AsideMenuItem
        v-for="item in dat"
        :key="item"
        :menu="item"
      ></AsideMenuItem> -->
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">控制台</span>
    </el-menu-item>

    <el-submenu index="/sys">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/users">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/roles">
        <i class="el-icon-s-goods"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-menu-item index="/menus">
        <i class="el-icon-s-help"></i>
        <span slot="title">菜单管理</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
  <!-- </div> -->
</template>

<script>
// import AsideMenuItem from './AsideMenuItem.vue'
export default {
  // components: {
  // AsideMenuItem
  // },
  name: 'index',
  data() {
    return {
      dat: []
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    // 获取左侧菜单接口
    async getMenuList() {
      const res = await this.$store.dispatch('user/nav')
      this.dat = res
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  background-color: rgb(34, 45, 50);
  border-right: none;
}
</style>
