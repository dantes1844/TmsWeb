import { UploadApiResult } from '@/api/sys/model/uploadModel';
import { BasicPageParams } from '@/api/model/baseModel';

export interface NoticeDetail {
  id: number;
  title: string;
  noticeType: NoticeType;
  status: number;
  file?: string | null;
  files: UploadApiResult[];
  creationTime: string;
  content: string;
  userName: string;
}

export interface CreateNoticeModel {
  id?: number;
  title: string;
  noticeType: NoticeType;
  status: number;
  file: string | null;
  time: string;
}

export interface NoticeTypeItem {
  value: NoticeType;
  label: string;
}
export enum NoticeType {
  All = 0,
  Task = 1,
  Update = 2,
  Files = 3,
  Others = 99,
}

export interface NoticeTypeTab {
  NoticeType: NoticeType;
  Name: string;
}

export const NoticeTypeTabs: NoticeTypeTab[] = [
  { NoticeType: NoticeType.All, Name: '全部' },
  { NoticeType: NoticeType.Update, Name: '升级' },
  { NoticeType: NoticeType.Task, Name: '任务' },
  { NoticeType: NoticeType.Files, Name: '知识库' },
  { NoticeType: NoticeType.Others, Name: '其他' },
];
export type NoticeParams = BasicPageParams & {
  title?: string;
  noticeType: NoticeType;
};

export interface NoticeToggleParams {
  id: number;
  status: number;
}
