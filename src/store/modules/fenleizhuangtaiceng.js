
// // 引入 ajax

// import { zhuangtai } from "../../utils/httpm"

// // 分类模块
// let state = {
//     //初始化变量
//     list: []
// }
// let getters = {
//     list(state) {
//         return state.list;
//     }
// }
// let mutations = {
//     //修改list数组
//     changelist(state, arr) {
//         state.list = arr
//     }
// }
// let actions = {
//     reqlist(context) {
//         //发送jaajx
//         zhuangtai({ isturee: true }).then(res => {
//             if (res.data.code === 200) {
//                 context.comit("changelist",res.data.list)
//             }
//         })
//     }
// }

// //------创建仓库--------------
// export default new Vuex.Store({
//     state,
//     getters,
//     mutations,
//     actions,
//     //命名规则
//     namespaced: true
// })