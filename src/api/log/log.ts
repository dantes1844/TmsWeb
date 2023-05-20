import { defHttp } from '/@/utils/http/axios';

import {
  ErrorLog,
  ErrorLogInput,
  SystemLog,
  SystemLogInput,
  UserLog,
  UserLogInput
} from '@/api/log/model/logModel';

export enum Api {
  UserLogPages = '/app/log/user-log-pages',
  SystemLogPages = '/app/log/system-log-pages',
  ErrorLogPages = '/app/log/error-log-pages',
}

export const getUserLogs = (params?: UserLogInput) =>
  defHttp.get<UserLog[]>(
    { url: Api.UserLogPages, params },
    { isTransformResponse: false },
  );
export const getErrorLogs = (params?: ErrorLogInput) =>
  defHttp.get<ErrorLog[]>(
    { url: Api.ErrorLogPages, params },
    { isTransformResponse: false },
  );
export const getSystemLogs = (params?: SystemLogInput) =>
  defHttp.get<SystemLog[]>(
    { url: Api.SystemLogPages, params },
    { isTransformResponse: false },
  );
