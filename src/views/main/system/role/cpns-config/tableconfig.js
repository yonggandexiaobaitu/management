
// 使用table组件时候，传递的公共配置


//列的配置
export const TableColumn = [
  {
    label: '序号',
    width: '200',//列的宽度
    slot: {
      openslot:true,
      slotname:'order'
    },//是否启用插槽
  },
  {
    label: '角色名称',
    prop: "name",//列的字段名称
    width: '200',//列的宽度
    slot: {
      openslot:false,
      slotname:''
    },//是否启用插槽
  },
  {
    label: '角色权限',
    prop: "intro",//列的字段名称
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
export const isopenSelection=true;
export default{
  TableColumn,
  isopenSelection
}

