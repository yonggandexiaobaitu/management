

/**
 * config:{
 *    type:'el-selct',
 *    placeholder: 占位,
 *    elOptions:[{ label: "启用",value: 1}]
 * }
 * 
 * 
 */
const setelSelect = function (config) {
  return {
    elitemtype: 'el-select',
    label: config.label,
    placeholder: config.placeholder,
    elOptions: config.elOptions,
    bindDataName:config.bindDataName,//绑定对象的key
  }
}
//设置input
const  setelInput=function(config){
  return {
    label: config.label,
    elitemtype:'el-input',//类型是input
    placeholder: config.placeholder,
    bindDataName:config.bindDataName,//绑定对象的key
  }
}
//设置日期选择器
const setdatepicker=function(config){
  return {
    elitemtype:"el-date-picker",
    type:config.type,//类型
    label: config.label,
    start_placeholder:config.start_placeholder,//开始占位
    end_placeholder:config.end_placeholder,//结束占位
    bindDataName:config.bindDataName,//绑定对象的key
   
  }

}   
export {
  setelSelect,
  setelInput,
  setdatepicker

}
