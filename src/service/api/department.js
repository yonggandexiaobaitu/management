import request from "../request";

export const departmentlist= function ({offset=0,size=10,cellphone='',createAt='',enable='',name='',realname=''}={}){
  return request.post({
    url:'/department/list',
    data:{
      offset,
      size,
     

    }
  })
};

