<template>
  <el-menu-item v-if="menu.children && menu.action" :index="menu.path">
    <el-icon><location /></el-icon><span>{{ menu.label }}</span>
  </el-menu-item>

  <el-sub-menu v-else :index="menu.path">
    <template #title>
      <el-icon><document /></el-icon><span>{{ menu.label }}</span>
    </template>
    <AsideMenuItem
      v-for="child in menu.children"
      :menu="child"
      :key="child"
    ></AsideMenuItem>
  </el-sub-menu>
</template>

<script>
import AsideMenuItem from './AsideMenuItem.vue'
export default {
  components: {
    AsideMenuItem
  },
  props: ['menu'],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
