import request from "../request";

export const rolelist= function ({offset=0,size=10}={}){
  return request.post({
    url:'/role/list',
    data:{
      offset,
      size,
    }
  })
};
