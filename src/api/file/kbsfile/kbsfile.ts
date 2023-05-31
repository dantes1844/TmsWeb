import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  SaveKbsFile = '/app/kbs-file',
  SetKbsFileStatus = '/roles/setStatus',
  KbsFilePageList = '/app/kbs-file/pages',
  GetAllKbsFileList = '/kbs-file/all',
}

export type KbsFileParams = {
  id: string;
  fileName: string;
  KbsFile: number;
  userName?: string;
};

export type KbsFilePageParams = BasicPageParams & KbsFileParams;

export interface KbsFileListItem {
  id: string;
  typeName: string;
  userName: string;
  sequence?: number;
  isDefault: boolean;
  isStatic: boolean;
  downloadCount: number;
}

export const getKbsFileListByPage = (params?: KbsFilePageParams) =>
  defHttp.get<KbsFilePageListGetResultModel>(
    { url: Api.KbsFilePageList, params },
    { isTransformResponse: false },
  );

export const getAllKbsFileList = (params?: KbsFileParams) =>
  defHttp.get<KbsFileListGetResultModel>(
    { url: Api.GetAllKbsFileList, params },
    { isTransformResponse: false },
  );

export const setKbsFileStatus = (id: string, status: boolean) =>
  defHttp.post(
    { url: Api.SetKbsFileStatus, params: { id, isDefault: status } },
    { isTransformResponse: false },
  );

export const createKbsFile = (role: KbsFileParams) => {
  return defHttp.post({ url: Api.SaveKbsFile, data: role }, { isTransformResponse: false });
};
export const updateKbsFile = (KbsFile: KbsFileParams) =>
  defHttp.put({
    url: `${Api.SaveKbsFile}/${KbsFile.id}`,
    params: KbsFile,
  },
    {
      isTransformResponse: false
    });
export const deleteKbsFile = (KbsFile: Recordable) =>
  defHttp.delete(
    {
      url: `${Api.SaveKbsFile}/${KbsFile.id}`,
      params: KbsFile,
    },
    {
      isTransformResponse: false,
    },
  );

export type KbsFilePageListGetResultModel = BasicFetchResult<KbsFileListItem>;

export type KbsFileListGetResultModel = KbsFileListItem[];
