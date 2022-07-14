<template>
  <div class="aside-container">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="menuPath"
      background-color="#303133"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="flag"
      :collapse-transition="false"
    >
      <aside-menu
        v-for="(item, index) in dat"
        :key="index"
        :data="item"
      ></aside-menu>
      <!-- <el-menu-item index="/home">
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
        </el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
import AsideMenu from './AsideMenuItem'
import { mapActions } from 'vuex'
import store from '@/store'
import router from '@/router'
export default {
  components: {
    AsideMenu
  },
  props: ['flag'],
  name: 'index',
  data() {
    return {
      dat: [],
      menuPath: ''
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    // 获取左侧菜单接口
    ...mapActions(['user/navMenu']),
    async getMenuList() {
      await this['user/navMenu']()
      this.dat = store.state.user.menus
      console.log(store.state.user)
    }
  },
  watch: {
    $route: {
      handler() {
        const data = router.currentRoute
        this.menuPath = data.path
      },
      immediate: true,
      deep: true
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
