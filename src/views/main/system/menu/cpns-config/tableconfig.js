// 使用table组件时候，传递的公共配置


//列的配置
export const TableColumn = [

  {
    label: '菜单名称',
    prop: "name",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:false,
      slotname:''
    },//是否启用插槽
  },
  {
    label: '级别',
    prop: "type",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:false,
      slotname:''
    },//是否启用插槽
  },
  {
    label: '菜单url',
    prop: "url",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:false,
      slotname:''
    },//是否启用插槽
    
  },
  {
    label: '菜单icon',
    prop: "icon",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:false,
      slotname:'' ,//插槽名字
    },//是否启用插槽
  },
  {
    label: '排序',
    prop: "sort",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:false,
      slotname:''
    },//是否启用插槽
  },
  {
    label: '权限',
    prop: "permission",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:false,
      slotname:''
    },//是否启用插槽
  },
  {
    label: '创建时间',
    prop: "createAt",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:true,
      slotname:'createAt'
    },//是否启用插槽
  },
  {
    label: '更新时间',
    prop: "updateAt",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:true,
      slotname:'updateAt'
    },//是否启用插槽
  },
  {
    label: '操作',
    prop: "",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:true,
      slotname:'handle'
    },//是否启用插槽
  },
]
//是否开启多选配置
export const isopenSelection=false;
export const isopenTreeShow={
  rowKey:'id',
  isopen:true
}
export default{
  TableColumn,
  isopenTreeShow,
  isopenSelection
}

