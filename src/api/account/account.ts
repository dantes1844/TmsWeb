import { defHttp } from '/@/utils/http/axios';
import {
  AccountParams,
  CreateAccountModel,
  GetAccountInfoModel,
  UpdateAccountModel,
} from '/@/api/account/model/accountModel';
import { AccountListGetResultModel } from '/@/api/demo/model/systemModel';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  Account = '/identity/users',
  CreateAccount = '/identity/create-user',
  AccountList = '/identity/user/pages',
}

// Get personal center-basic settings

export const accountInfoApi = () => defHttp.get<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });

export const sessionTimeoutApi = () => defHttp.post<void>({ url: Api.SESSION_TIMEOUT });

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>(
    { url: Api.AccountList, params },
    {
      isTransformResponse: false,
    },
  );

export const createAccount = (params: CreateAccountModel) => {
  return defHttp.post(
    { url: Api.CreateAccount, data: params },
    {
      isTransformResponse: false,
    },
  );
};

export const updateAccount = (params: UpdateAccountModel) =>
  defHttp.put(
    { url: `${Api.Account}/${params.id}`, params },
    {
      isTransformResponse: false,
    },
  );
export const deleteAccount = (id: string) =>
  defHttp.delete(
    { url: `${Api.Account}/${id}` },
    {
      isTransformResponse: false,
    },
  );

export const tokenExpiredApi = () => defHttp.post<void>({ url: Api.TOKEN_EXPIRED });
