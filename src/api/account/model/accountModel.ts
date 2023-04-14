import { BasicPageParams } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
  deptId?: number;
};

export interface AccountListItem {
  id: string;
  account: string;
  // email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface GetAccountInfoModel {
  email: string;
  name: string;
  introduction: string;
  phone: string;
  address: string;
}

export interface CreateAccountModel {
  userName: string;
  Email: string;
  roles: string[];
  deptId: number;
  name: string;
  password: string;
}

export interface UpdateAccountModel {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  deptName: string;
  name: string;
  password: string;
}
