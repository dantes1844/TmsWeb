import { defHttp } from '/@/utils/http/axios';
import {
  DeleteDeptModel,
  DeptListGetResultModel,
  DeptListItem,
} from '/@/api/department/model/deptModel';

enum Api {
  DeptList = '/app/department',
  DeptPage = '/app/department/pages',
}

export const createDept = (params?: DeptListItem) =>
  defHttp.post(
    { url: Api.DeptList, params },
    {
      isTransformResponse: false,
    },
  );
export const updateDept = (params?: DeptListItem) =>
  defHttp.put(
    { url: Api.DeptList, params },
    {
      isTransformResponse: false,
    },
  );
export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>(
    { url: Api.DeptList, params },
    {
      isTransformResponse: false,
    },
  );

export const getDeptPage = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>(
    { url: Api.DeptPage, params },
    {
      isTransformResponse: false,
    },
  );
export const deleteDept = (params: DeleteDeptModel) =>
  defHttp.delete<any>(
    { url: `${Api.DeptList}/${params.id}`, params },
    {
      isTransformResponse: false,
    },
  );
