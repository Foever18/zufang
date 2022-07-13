import Vue from 'vue'
import Vuex from 'vuex'
// 保存本地文件
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    VillageName: '请输入小区名称'
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setVillageName (state, payload) {
      state.VillageName = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
