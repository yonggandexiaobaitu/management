
<!-- 代表当前是有子菜单的 -->
<template>
  <el-sub-menu :index="`${String(item.id)}`" v-if="com_child(item)">
    <template #title>
      <EpAim /><EpFailed/>
      <span>{{item.name}}</span>

    </template>
    <template v-for="(childrenItem, childrenindex) in item.children">
      <el-menu-item-group v-if="!childrenItem?.children?.length">
        <el-menu-item @click="routepush(Object.assign(childrenItem,{i:item.name}))" :key="childrenindex" :index="`${String(childrenItem.id)}`">{{ childrenItem.name }}</el-menu-item>
      </el-menu-item-group>
      <template v-else>
        <navSubMenu :item="Object.assign(childrenItem,{i:item.name})"  />
      </template>
    </template>
  </el-sub-menu>
  <!-- 代表没有子元素，那么采用以下 -->
  <el-menu-item @click="routepush(item)" v-else :index="`${String(item.id)}`">{{ item.name }}</el-menu-item>
</template>
<script>
export default {
  name: 'subMenu'
}
</script>
<script setup>
import EpAim from '~icons/ep/aim'
import EpFailed from '~icons/ep/failed'
import { computed } from "vue"
import {useRouter} from "vue-router"
const router=useRouter();
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
const emits=defineEmits(['onItemClick'])
const com_child=computed(()=>{
  return (item)=>{
    // 
    return item.children && item.children.length&&item.children[0].type!==3
  }
})
const routepush=(item)=>{
  console.log(item,'emits',emits);
  router.push(item.url)
  emits('onItemClick',item)

}
</script>

<style lang="less" scoped>
</style>