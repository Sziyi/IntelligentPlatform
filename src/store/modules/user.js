import UserApi from '@/api/user'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    menus: [],
    avatar: '',
    nameinfo: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    menu(state, data) {
      state.menus = data.menus
    },
    userinfo(state, data) {
      state.avatar = data.avatar
      state.nameinfo = data.username
    }
  },
  actions: {
    async login({ commit }, loginForm) {
      const token = await UserApi.login(loginForm)
      commit('setToken', token)
      return token
    },
    async navMenu({ commit }) {
      try {
        const data = await UserApi.menu()
        commit('menu', data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    async tc({ commit }) {
      try {
        const data = await UserApi.logout()
        commit('userinfo', data)
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      removeAllItem()
      router.push('/login')
    }
  }
}
