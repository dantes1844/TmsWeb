export interface NoticeDetail {
  id: number;
  title: string;
  noticeType: NoticeType;
  status: number;
  file: string | null;
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
  Task = 1,
  Update= 2,
  Files = 3,
  Others = 4
}

export interface NoticeParams{
  title: string;
  status: number;
  noticeType: NoticeType;
}

export interface NoticeToggleParams {
  id: number;
  status: number;
}


