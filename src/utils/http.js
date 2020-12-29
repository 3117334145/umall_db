import axios from "axios"
import qs from "qs"
import Vue from "vue"
//崔武弹框
import { cuowualert } from "./alert"
// 开发环境8080
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

// 打包环境8080
// Vue.prototype.$pre=""

//登录 拦截-----------
axios.interceptors.response.use(res => {
    console.group("本次地址是：" + res.config.url)
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    //统一失败弹
    if (res.data.code !== 200) {
        cuowualert(res.data.msg)
    }
    return res
})

// post文件封装成一个方法
function fengzhaung(user) {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return data
}








//  ------------- 菜单管理添加-----------------
export let addALL = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}
//  -------------列表数据 管理-----------------
export let liebiaoall = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
}
//  -------------删除管理-----------------
export let shanchuall = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
//-----获取数据-----
export let reqMenuInfo = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: obj
    })
}
//--------修改借口--------------
export let xiugaiall = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(user)
    })
}









/*-----------------角色管理开始-----------------------------------------*/
export let jueseall = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })

}
/*-----------------列表数据开始-----------------------------------------*/
export let jueseapp = (user) => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
        data: qs.stringify(user)
    })
}
/*-----------------删除开始-----------------------------------------*/
export let shanapp = (attr) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(attr)
    })
}
/*-----------------一条数据详情-----------------------------------------*/
export let huoquapp = (fn) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        data: qs.stringify(fn)
    })
}
// ------------------ 修改接口-------------------
export let xiugaiapp = (obj) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(obj)
    })
}

























/*-----------------管理员管理开始-----------------------------------------*/
export let guanliyuanapp = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })

}
/*-----------------列表数据开始----------page:1 size:1-------------------------------*/
export let liebiaofpp = (user) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: user
    })
}
/*-----------------删除开始-----------------------------------------*/
export let shaanchukaishiapp = (attr) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(attr)
    })
}
/*-----------------一条数据详情-------uid----------------------------------*/
export let yitiaoapp = (obj) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: obj
    })
}
// ------------------ 修改接口-------------------
export let gaiadd = (obj) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(obj)
    })
}
// ------分页按钮-------
export let fenyeanniu = (obj) => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
        //    data: qs.stringify(obj)
    })
}






// *-----------------商品管理添加开始----img -------------------------------------*/
export let shangpintianjiaapp = (user) => {

    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: fengzhaung(user)
    })

}
/*-----------------列表数据开始----------page:1 size:1-------------------------------*/
export let shangpinliebiaoapp = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: p
    })
}
/*-----------------删除开始-----------------------------------------*/
export let shangpinshanchuapp = (attr) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(attr)
    })
}
/*-----------------一条数据详情-------uid----------------------------------*/
export let shangpinxiangqingapp = (user) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: user
    })
}
// ------------------ 修改接口-------------------
export let shangpinxiugaiapp = (user) => {
    return axios({
        url: baseUrl + " /api/cateedit",
        method: "post",
        data: fengzhaung(user)
    })
}













// *-----------------轮播图添加开始----img -------------------------------------*/
export let lunbutianjiaapp = (user) => {

    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: fengzhaung(user)
    })

}
/*-----------------列表数据开始----------page:1 size:1-------------------------------*/
export let lunboliebiaoapp = (p) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
        params: p
    })
}
/*-----------------删除开始-----------------------------------------*/
export let lunboshanchuapp = (attr) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(attr)
    })
}
/*-----------------一条数据详情-------uid----------------------------------*/
export let lunboxiangqingapp = (user) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: user
    })
}
// ------------------ 修改接口-------------------
export let lunboxiugaiapp = (user) => {
    return axios({
        url: baseUrl + " /api/banneredit",
        method: "post",
        data: fengzhaung(user)
    })
}


























/*-----------------会员列表数据开始----------page:1 size:1-------------------------------*/
export let huiyuanliebiaoapp = (p) => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
        params: p
    })
}

/*-----------------会员获取一条数据详情-------uid----------------------------------*/
export let huiyuanxiangqingapp = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: uid
    })
}
// ------------------ 会员修改接口-------------------
export let huiyuanxiugaiapp = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(user)
    })
}
















































/*-----------------商品规格添加----------page:1 size:1-------------------------------*/
export let guigetianjiaapp = (user) => {
    //  图片封装
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: fengzhaung(user)
    })
}
//列表
export let guigeliebiaoapp = (user) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        data: user
    })
}
//详情
export let guigexiangqingapp = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        data: user
    })
}


//修改
export let guigexiugaiapp = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "get",
        data: fengzhaung(user)
    })
}

//删除
export let shanchuguigeapp = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}


// 总数
export let guigezongapp = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}



