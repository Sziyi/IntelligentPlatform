import UserApi from '@/api/user'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    menus: [],
    imgs: '',
    avatar: '',
    nameInfo: '',
    tags: [
      {
        fullPath: '/',
        meta: { title: '控制台' },
        path: '/'
      }
    ]
  },
  mutations: {
    // 存token
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    // 左侧菜单
    menu(state, data) {
      state.menus = data.menus
    },
    // 头像
    userinfo(state, data) {
      state.avatar = data.avatar
      state.nameInfo = data.username
    },
    // 标签栏
    tags(state, data) {
      const index = state.tags.findIndex((it) => {
        return it.path === data.path
      })
      if (index === -1) {
        state.tags.push(data)
      }
    },
    closeTags(state, name) {
      const index = state.tags.findIndex((it) => {
        return it.meta.title === name
      })
      state.tags.splice(index, 1)
    },
    allTags(state) {
      state.tags = [
        {
          fullPath: '/',
          meta: { title: '控制台' },
          path: '/'
        }
      ]
    }
  },
  actions: {
    // 登录接口
    async login({ commit }, loginForm) {
      const token = await UserApi.login(loginForm)
      commit('setToken', token)
      return token
    },
    // 左侧菜单接口
    async navMenu({ commit }) {
      try {
        const data = await UserApi.menu()
        commit('menu', data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    // 退出登录
    logout() {
      removeAllItem()
      router.push('/login')
    },
    // 标签栏
    tags({ commit }, data) {
      commit('tags', data)
    },
    // 关闭单个
    closeTags({ commit }, name) {
      commit('closeTags', name)
    },
    // 关闭所有
    allTags({ commit }) {
      commit('allTags')
    },
    // 头像
    async img({ commit }) {
      try {
        const data = await UserApi.tx()
        // console.log('vuex=>', data)
        commit('userinfo', data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
