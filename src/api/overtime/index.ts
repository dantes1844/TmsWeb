import { defHttp } from '/@/utils/http/axios';
import {
  CreateOvertime,
  UpdateOvertime,
  OvertimeDetail,
  OvertimeParams
} from '@/api/overtime/model';

enum Api {
  BasicUrl = '/app/overtime',
}

export const getOvertimePages = (params?: OvertimeParams) =>{
  return defHttp.get<OvertimeDetail[]>(
    { url: `${Api.BasicUrl}/pages`, params },
    { isTransformResponse: false },
  );
}

export const createOvertime = (params?: CreateOvertime) =>
  defHttp.post<OvertimeDetail>(
    { url: Api.BasicUrl, params },
    { isTransformResponse: false },
  );

export const updateOvertime = (params?: UpdateOvertime) =>
  defHttp.put<OvertimeDetail>(
    { url: `${Api.BasicUrl}/${params?.id}`, params },
    { isTransformResponse: false },
  );

export const deleteOvertime = (id: number) =>
  defHttp.delete<OvertimeDetail>(
    { url: `${Api.BasicUrl}/${id}` },
    { isTransformResponse: false },
  );

