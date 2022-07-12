<template>
  <el-submenu
    :index="data.path"
    v-if="data.children.length != 0 && data.component === null"
  >
    <template slot="title">
      <i :class="'el-icon-' + data.icon"></i>
      <span slot="title">{{ data.label }}</span>
    </template>
    <AsideMenuItem
      v-for="(item, index) in data.children"
      :key="index"
      :data="item"
    ></AsideMenuItem>
  </el-submenu>
  <el-menu-item-group v-else>
    <el-menu-item :index="data.path">
      <i :class="'el-icon-' + data.icon"></i>
      <span slot="title"> {{ data.label }}</span>
    </el-menu-item>
  </el-menu-item-group>
</template>

<script>
export default {
  name: 'AsideMenuItem',
  props: ['data'],
  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.el-menu-item-group__title {
  padding: none;
}
</style>
