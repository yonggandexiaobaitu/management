
<template>
  <el-row>
    <el-col :span="12">
      <slot name="title"></slot>
    </el-col>
    <el-col :span="12">
      <slot name="rightcontent"></slot>
    </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%" :border="border"    :row-key="isopenTreeShow.isopen?isopenTreeShow.rowKey:''">
    <template v-if="isopenSelection">
      <el-table-column type="selection" width="55" />
    </template>
    <template v-for="(item) in TableColumn">
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width">
        <template v-if="item.slot.openslot" #default="scope">
          <slot :name="item.slot.slotname" :row="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </template>


  </el-table>
</template>

<script setup>
const props = defineProps({
  //是否开启树形结构化数据，并且指定id
  isopenTreeShow:{
    type:Object,
    default:()=>({
      isopen:false,
      rowKey:null
    })
  },
  //是否开启多选
  isopenSelection: {
    type: Boolean,
    default: false
  },
  TableColumn: {
    type: Array,
    default: () => ([])
  },
  //表格数据
  tableData: {
    type: Array,
    default: () => ([])
  },
  border: {
    type: Boolean,
    default: true
  },

})
</script>

<style lang="less" scoped>
</style>