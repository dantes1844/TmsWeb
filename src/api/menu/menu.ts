import { defHttp } from '/@/utils/http/axios';
import {
  CreateMenuModel,
  MenuListGetResultModel,
  MenuParams,
  MenuToggleParams,
} from '/@/api/menu/model/menuModel';

enum Api {
  MenuPages = '/app/menus/pages',

  CreateMenu = '/app/menus',

  UpdateMenu = '/app/menus',

  DeleteMenu = '/app/menus',

  ToggleMenuDisabled = '/admin/menus/toggle',

  ApiList = '/menu/apilist',
}

export const getMenuPages = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>(
    { url: Api.MenuPages, params },
    { isTransformResponse: false },
  );
export const getApiList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.ApiList, params }, { isTransformResponse: false });

export const createMenu = (params?: CreateMenuModel) =>
  defHttp.post<MenuListGetResultModel>(
    { url: Api.CreateMenu, params },
    { isTransformResponse: false },
  );

export const updateMenu = (params?: CreateMenuModel) =>
  defHttp.put<MenuListGetResultModel>(
    { url: `${Api.UpdateMenu}/${params?.id}`, params },
    { isTransformResponse: false },
  );

export const deleteMenu = (id: number) =>
  defHttp.delete<MenuListGetResultModel>(
    { url: `${Api.DeleteMenu}/${id}` },
    { isTransformResponse: false },
  );

export const toggleMenuDisabled = (params?: MenuToggleParams) =>
  defHttp.post<MenuListGetResultModel>(
    { url: Api.ToggleMenuDisabled, params },
    { isTransformResponse: false },
  );
