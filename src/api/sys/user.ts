import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  GetUserInfoModel,
  LoginResultWithoutToken,
  TokenParams,
  TokenResultModel,
  ResetPasswordModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/account/login',
  GetToken = '/connect/token',
  Logout = '/api/account/user-logout',
  GetUserInfo = '/connect/userinfo',
  GetPermCode = '/roles/getPermCode',
  TestRetry = '/testRetry',
  ResetPassword = '/api/account/reset-password',
}

/**
 * @description: 用户登陆
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultWithoutToken>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
      isTransformResponse: false, // 返回的接口格式跟要转化的不一致，所以配置不用转换
    },
  );
}
/**
 * @description: 拿当前用户的token
 */
export function getTokenApi(params: TokenParams, mode: ErrorMessageMode = 'modal') {
  params.client_id = 'TaskSystem_App'; // todo 放到配置里
  params.grant_type = 'password';
  return defHttp.post<TokenResultModel>(
    {
      url: Api.GetToken,
      params,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      },
    },
    {
      errorMessageMode: mode,
      apiUrl: '', // 这个地址是openiddict提供的，没有api前缀
      isTransformResponse: false,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo },
    {
      apiUrl: '',
      errorMessageMode: 'none',
      isTransformResponse: false,
    },
  );
}
/**
 * @description: 修改密码
 */
export function resetPassword(params: ResetPasswordModel) {
  return defHttp.post<any>(
    {
      params,
      url: Api.ResetPassword,
    },
    {
      apiUrl: '',
      errorMessageMode: 'modal',
      isTransformResponse: false,
    },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode },{
    isTransformResponse: false
  });
}

export function doLogout() {
  return defHttp.get(
    { url: Api.Logout },
    {
      apiUrl: '',
      isTransformResponse: false,
    },
  );
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
