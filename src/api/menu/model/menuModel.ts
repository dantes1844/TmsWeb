import { BasicFetchResult } from '/@/api/model/baseModel';

export interface MenuListItem {
  id: number;
  order: number;
  creationTime: string;
  enabled: number;
  icon: string;
  component: string;
  permission: string;
}
export interface CreateMenuModel {
  id: number;
  order: number;
  displayName: string;
  name: string;
  enabled: boolean;
  icon: string;
  url: string;
}

export type MenuParams = {
  menuName?: string;
  status?: string;
};
export type MenuToggleParams = {
  menuName?: string;
  status: boolean;
};

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;
