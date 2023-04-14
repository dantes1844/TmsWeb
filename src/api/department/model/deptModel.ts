import { BasicFetchResult } from '/@/api/model/baseModel';

export interface DeptListItem {
  id: number;
  deptName: string;
  orderNo: string;
  creationTime: string;
  remark: string;
  status: number;
}

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export interface DeleteDeptModel {
  id: number;
}
