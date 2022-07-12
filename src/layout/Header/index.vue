<template>
  <div class="header">
    <div class="l">
      <div
        :class="flag ? 'el-icon-s-unfold ' : 'el-icon-s-fold'"
        @click="fold"
      ></div>
    </div>
    <div class="r">
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <i class="el-icon-rank" @click="screen"></i>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="关闭全部标签"
        placement="bottom"
      >
        <i class="el-icon-error"></i>
      </el-tooltip>
      <div class="t"></div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          duck<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人设置</el-dropdown-item>
          <el-dropdown-item command="error">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['flag'],
  data() {
    return {
      icon: false,
      isCollapse: true,
      fullscreen: false
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    ...mapActions(['user/tc', 'login/logout']),
    async getlist() {
      await this['user/tc']()
    },
    handleCommand(command) {
      if (command === 'error') {
        this.exitLogin()
      }
    },
    // 退出登录
    exitLogin() {
      // alert('退出')
      this.$confirm('您确定要退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this['user/logout']()
          this.$notify({
            title: '提示',
            message: '正在退出...',
            type: 'success'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 侧边栏收缩
    fold() {
      this.$emit('fold')
    },
    // 全屏
    screen() {
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
}
.l {
  flex: 1;
  // background-color: aqua;
  float: left;
  .el-icon-s-fold,
  .el-icon-s-unfold {
    font-size: 23px;
    color: #fff;
  }
}
.r {
  width: 190px;
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
