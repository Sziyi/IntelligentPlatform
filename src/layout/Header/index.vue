<template>
  <div>
    <div class="l">
      <i class="el-icon-s-unfold" v-show="icon" @click="ic"></i>
      <i class="el-icon-s-fold" v-show="!icon" @click="ic"></i>
    </div>
    <div class="r">
      <i class="el-icon-rank"></i>
      <i class="el-icon-error"></i>
      <div class="t"></div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          duck<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人设置</el-dropdown-item>
          <el-dropdown-item command="b">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: false,
      isCollapse: true
    }
  },
  mounted() {},
  methods: {
    handleCommand(command = 'b') {
      // alert('退出')
      this.$confirm('您确定要退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            title: '提示',
            message: '正在退出...',
            type: 'success'
          })
          localStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    ic() {
      this.icon = !this.icon
    }
  }
}
</script>

<style scoped lang="scss">
.l {
  width: 78%;
  // background-color: aqua;
  float: left;
  .el-icon-s-fold,
  .el-icon-s-unfold {
    font-size: 23px;
    color: #fff;
  }
}
.r {
  width: 22%;
  height: 60px;
  float: right;
  .el-icon-rank,
  .el-icon-error {
    float: left;
    margin-right: 18px;
    line-height: 60px;
    font-size: 23px;
    color: #fff;
  }
  .el-icon-rank {
    transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
  }
  .el-dropdown-link {
    cursor: pointer;
    font-size: 18px;
    color: white;
    font-weight: bold;
  }
}
.t {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #c0c4cc;
  line-height: 60px;
  float: left;
  margin-top: 10px;
}
.el-dropdown {
  float: right;
}
</style>
