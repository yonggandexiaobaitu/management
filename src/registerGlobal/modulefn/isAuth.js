import useLogin from "@/stores/modules/login"

function getAllpermission (userMenus) {
  let allpermission = [];
  for (const item of userMenus) {
     if(item.type===3){
      allpermission.push(item.permission)
     }
     if(item?.children?.length){
        let res= getAllpermission(item.children)
        allpermission.push(...res)
     }
  }
  return allpermission;
}

export default (permission) => {
  //初始化store数据，防止用户刷新
  const loginStore = useLogin()
  const allpermission=getAllpermission( loginStore.userMenus)
  // console.log('isAuth先获取loginStore', loginStore.userMenus,allpermission);
  return  allpermission.includes(permission)

}