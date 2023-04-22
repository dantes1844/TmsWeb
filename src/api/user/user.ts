import { defHttp } from '/@/utils/http/axios';
import {UserDetail, UserParams} from "@/api/user/model/userModel";


enum Api {
  UserList = '/identity/user/all',
}

export const getUserList = (params?: UserParams) =>{
  return defHttp.get<UserDetail[]>(
    { url: Api.UserList, params },
    { isTransformResponse: false },
  );
}
