import { defHttp } from '/@/utils/http/axios';
import {
  CreateNoticeModel,
  NoticeDetail,
  NoticeParams,
  NoticeToggleParams
} from '@/api/notice/model/noticeModel';
import { BasicFetchResult } from "@/api/model/baseModel";
import { FileTypeListItem } from "@/api/file/filetype/filetype";

enum Api {
  NoticePages = '/app/notice/pages',
  CreateNotice = '/app/notice',
  UpdateNotice = '/app/notice',
  DeleteNotice = '/app/notice',
  ToggleNoticeDisabled = '/admin/notice/toggle',
}

export const getNoticePages = (params?: NoticeParams) =>{
  return defHttp.get<NoticePageListGetResultModel>(
    { url: Api.NoticePages, params },
    { isTransformResponse: false },
  );
}

export const createNotice = (params?: CreateNoticeModel) =>
  defHttp.post<NoticeDetail>(
    { url: Api.CreateNotice, params },
    { isTransformResponse: false },
  );

export const updateNotice = (params?: CreateNoticeModel) =>
  defHttp.put<NoticeDetail>(
    { url: `${Api.UpdateNotice}/${params?.id}`, params },
    { isTransformResponse: false },
  );

export const deleteNotice = (id: number) =>
  defHttp.delete<NoticeDetail>(
    { url: `${Api.DeleteNotice}/${id}` },
    { isTransformResponse: false },
  );

export const toggleNoticeDisabled = (params?: NoticeToggleParams) =>
  defHttp.post<NoticeDetail>(
    { url: Api.ToggleNoticeDisabled, params },
    { isTransformResponse: false },
  );
export type NoticePageListGetResultModel = BasicFetchResult<NoticeDetail>;
