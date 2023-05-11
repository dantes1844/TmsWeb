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
export enum MenuType {
  Module = 1,
  Page = 2,
  Button = 3
}

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export type MenuToggleParams = {
  menuName?: string;
  status: boolean;
};

interface ShortCut {
  id: number;
  color: string;
  icon: string;
  title: string;
  url?: string;
}

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;
