import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  SaveRole = '/roles/save',
  SetRoleStatus = '/roles/setStatus',
  RolePageList = '/identity/roles/page',
  GetAllRoleList = '/identity/roles/simple-all',

  GetAllPermissions = '/roles/allPermissions',
}

export type RoleParams = {
  id: string;
  roleName: string;
  isDefault: boolean;
  isPublic: boolean;
  extraProperties: Map<string, string>;
  permissions: string[];
};

export type RolePermissionParams = {
  roleName: string;
};

export type PermissionModel = {
  id: string;
  label: string;
  level: number;
  children: RolePermissionModel[];
};

export type RolePermissionModel = {
  checkedItems: string[];
  tree: PermissionModel[];
};

export type RolePageParams = BasicPageParams & RoleParams;

export interface RoleListItem {
  id: string;
  name: string;
  isDefault: number;
  isStatic: string;
}

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>(
    { url: Api.RolePageList, params },
    { isTransformResponse: false },
  );

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>(
    { url: Api.GetAllRoleList, params },
    { isTransformResponse: false },
  );

export const getAllPermissions = (params?: RolePermissionParams) =>
  defHttp.get<RolePermissionModel>(
    { url: Api.GetAllPermissions, params },
    { isTransformResponse: false },
  );

export const setRoleStatus = (id: string, status: boolean) =>
  defHttp.post(
    { url: Api.SetRoleStatus, params: { id, isDefault: status } },
    { isTransformResponse: false },
  );

export const createRole = (role: RoleParams) => {
  return defHttp.post({ url: Api.SaveRole, data: role });
};
export const updateRole = (role: RoleParams) =>
  defHttp.put({
    url: `${Api.SaveRole}/${role.id}`,
    params: role,
  });
export const deleteRole = (role: Recordable) =>
  defHttp.delete(
    {
      url: `${Api.SaveRole}/${role.id}`,
      params: role,
    },
    {
      isTransformResponse: false,
    },
  );

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
