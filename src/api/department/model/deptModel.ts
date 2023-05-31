import { BasicFetchResult } from '/@/api/model/baseModel';

export enum DepartmentStatus  {
  Disabled = 0,
  Enabled = 1,
}

export interface DeptListItem {
  id: number;
  deptName: string;
  orderNo: string;
  creationTime: string;
  remark: string;
  status: DepartmentStatus;
}

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export interface DeleteDeptModel {
  id: number;
}
