//引入vue
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import { actions } from "./actions"
import { state, getters, mutations } from "./mutations"
// import fenleizhuangtaiceng from "./modules/fenleizhuangtaiceng"
// import banner from "./modules/banner"
//------创建仓库--------------
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,

    // modules: {
    //     fenleizhuangtaiceng,
    //     banner,
    // }
})