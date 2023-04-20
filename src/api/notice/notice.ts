import { defHttp } from '/@/utils/http/axios';
import {
  CreateNoticeModel,
  NoticeDetail,
  NoticeParams,
  NoticeToggleParams, NoticeType
} from '@/api/notice/model/noticeModel';
import Notice from '@/router/routes/modules/notice';

enum Api {
  NoticePages = '/app/notice/pages',
  CreateNotice = '/app/notice',
  UpdateNotice = '/app/notice',
  DeleteNotice = '/app/notice',
  ToggleNoticeDisabled = '/admin/notice/toggle',
}

export const notices: Notice[] = [
  {
    title: '关于TMS系统升级到1.1版本事宜',
    status: 1,
    noticeType: NoticeType.Update,
    files: null,
    time: '2023-03-23 14:23:35'
  },
  {
    title: '关于全体成员派发新建厂站任务的通知',
    status: 1,
    noticeType: NoticeType.Task,
    files: null,
    time: '2023-03-27 10:12:29'
  },
  {
    title: '上传《规章制度》文件供学习的通知',
    status: 1,
    noticeType: NoticeType.Files,
    files: null,
    time: '2023-04-02 11:13:50'
  },
  {
    title: '上传《厂站扩建技术协议》资料供学习的通知',
    status: 1,
    noticeType: NoticeType.Files,
    files: '《厂站扩建技术协议》.pdf',
    time: '2023-04-11 16:23:02'
  },
  {
    title: '系统将于2023年4月23日升级，暂停使用的通知',
    status: 1,
    noticeType: NoticeType.Update,
    files: null,
    time: '2023-04-20 09:46:33'
  },
]
export const getNoticePages = (params?: NoticeParams) =>{
  // defHttp.get<NoticeDetail>(
  //   { url: Api.NoticePages, params },
  //   { isTransformResponse: false },
  // );
  return notices;
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
