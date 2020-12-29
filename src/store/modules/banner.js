// 分类模块
let state = {
    list: []
}
let getters = {}
let mutations = {}
let actions = {}

//------创建仓库--------------
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
      //命名规则
    banner
})