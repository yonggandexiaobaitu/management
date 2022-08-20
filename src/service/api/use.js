import request from "../request";

export const userslist= function ({offset=0,size=10,cellphone='',createAt='',enable='',name='',realname=''}={}){
  return request.post({
    url:'/users/list',
    data:{
      offset,
      size,
      createAt,
      enable,
      name,
      realname,
      cellphone,

    }
  })
};

