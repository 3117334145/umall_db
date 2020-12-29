
import Vue from "vue"
let str=new Vue()





// OK
export let okalert = (msg) => {
    str.$message({
        message: msg,
        type: "success",
    });
}
// 错误
export let cuowualert = (msg) => {
    str.$message({
        message: msg,
        type: "warning",
    });
}
