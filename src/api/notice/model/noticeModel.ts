import {UploadApiResult} from "@/api/sys/model/uploadModel";

export interface NoticeDetail {
  id: number;
  title: string;
  noticeType: NoticeType;
  status: number;
  file: string | null;
  files: UploadApiResult[];
  time: string;
  content: string;
}

export interface CreateNoticeModel {
  id?: number;
  title: string;
  noticeType: NoticeType;
  status: number;
  file: string | null;
  time: string;
}

export interface NoticeTypeItem{
  value: NoticeType;
  label: string;
}
export enum NoticeType {
  All = null,
  Task = 1,
  Update= 2,
  Files = 3,
  Others = 99
}

export interface NoticeTypeTab{
  NoticeType: NoticeType,
  Name: string;
}

export const NoticeTypeTabs: NoticeTypeTab[] = [
  { NoticeType: NoticeType.All  , Name: '全部' },
  { NoticeType: NoticeType.Update, Name: '升级' },
  { NoticeType: NoticeType.Task , Name: '任务' },
  { NoticeType: NoticeType.Files, Name: '知识库' },
  { NoticeType: NoticeType.Others, Name: '其他' },
]
export interface NoticeParams{
  title?: string;
  noticeType: NoticeType;
}

export interface NoticeToggleParams {
  id: number;
  status: number;
}


