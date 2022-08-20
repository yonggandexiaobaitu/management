import request from "../request";

export const menulist= function (){
  return request.post({
    url:'/menu/list',
  })
};

