import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  SaveFileType = '/app/file-type',
  SetFileTypeStatus = '/roles/setStatus',
  FileTypePageList = '/app/file-type/pages',
  GetAllFileTypeList = '/app/file-type',
}

export type FileTypeParams = {
  id: string;
  typeName: string;
  type: number;
  userName?: string;
};

export type FileTypePageParams = BasicPageParams & FileTypeParams;

export interface FileTypeListItem {
  id: string;
  typeName: string;
  userName: string;
  sequence?: number;
  isDefault: boolean;
  isStatic: boolean;
}

export const getFileTypeListByPage = (params?: FileTypePageParams) =>
  defHttp.get<FileTypePageListGetResultModel>(
    { url: Api.FileTypePageList, params },
    { isTransformResponse: false },
  );

export const getAllFileTypeList = (params?: FileTypeParams) =>
  defHttp.get<FileTypeListGetResultModel>(
    { url: Api.GetAllFileTypeList, params },
    { isTransformResponse: false },
  );

export const setFileTypeStatus = (id: string, status: boolean) =>
  defHttp.post(
    { url: Api.SetFileTypeStatus, params: { id, isDefault: status } },
    { isTransformResponse: false },
  );

export const createFileType = (role: FileTypeParams) => {
  return defHttp.post({ url: Api.SaveFileType, data: role }, { isTransformResponse: false });
};
export const updateFileType = (fileType: FileTypeParams) =>
  defHttp.put({
    url: `${Api.SaveFileType}/${fileType.id}`,
    params: fileType,
  },
    {
      isTransformResponse: false
    });
export const deleteFileType = (fileType: Recordable) =>
  defHttp.delete(
    {
      url: `${Api.SaveFileType}/${fileType.id}`,
      params: fileType,
    },
    {
      isTransformResponse: false,
    },
  );

export type FileTypePageListGetResultModel = BasicFetchResult<FileTypeListItem>;

export type FileTypeListGetResultModel = FileTypeListItem[];
