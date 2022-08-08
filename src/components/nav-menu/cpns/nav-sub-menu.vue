
<!-- 代表当前是有子菜单的 -->


<template>
  <el-sub-menu :index="item.id" v-if="item.children && item.children.length">
    <template #title>
      {{ item.name }}
    </template>
    <template v-for="(childrenItem, childrenindex) in item.children">
      <el-menu-item-group v-if="!childrenItem?.children?.length">
        <el-menu-item :key="childrenindex" :index="childrenItem.id">{{ childrenItem.name }}</el-menu-item>
      </el-menu-item-group>
      <template v-else>
        <navSubMenu :item="childrenItem" />
      </template>
    </template>
  </el-sub-menu>
  <!-- 代表没有子元素，那么采用以下 -->
  <el-menu-item v-else :index="item.id">{{ item.name }}</el-menu-item>
</template>
<script>
export default {
  name: 'subMenu'
}
</script>
<script setup>
import { computed } from "vue"
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
const isAuth = computed(() => {
  return (item) => {
    //判断当前array是否是type为2的
    // if(item?.children?.length){
    //   return item.children[0].type===2?true:false;
    // }else{
    //   false;
    // }
    return true;
  }
})

console.log('当前props', props);
</script>

<style lang="less" scoped>
</style>