import request from "../request";


/**
 * 用户登陆api
 * @param {*} account 用户账号
 * @param {*} password 用户密码
 * @returns 
 */
const login= function (account,password){
  return request.post({
    url:'/login',
    data:{
      "name": account,
      "password": password
    }
  })
};
/**
 * 根据用户id获取到用户信息
 * @param {*} id 
 * @returns 
 */
const getUserInfoByID=  function (id){
  return request.get({
    url:`/users/${id}`,
  })
};
const getUserMenusByRoleId=function(roleId){
  return request.get({
    url:`role/${roleId}/menu`
  })
}

export default {
  login,
  getUserInfoByID,
  getUserMenusByRoleId
}