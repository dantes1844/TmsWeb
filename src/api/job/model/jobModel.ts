import { BasicFetchResult, BasicPageParams } from '@/api/model/baseModel';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export enum JobStatus {
  Todo=0,
  InProgress=1,
  FinalCheck=2,
  Done=3,
  Canceled=10,
}
export type JobStatusNameAndColor = {
  name: string;
  color: string;
}

export function getStatusNameAndColor(status: JobStatus) :JobStatusNameAndColor {
  switch (status){
    case JobStatus.Todo:
      return { name: "未开始", color: ''};
    case JobStatus.Canceled:
      return { name: "已取消", color: 'red'};
    case JobStatus.FinalCheck:
      return { name: "待审核", color: 'purple'};
    case JobStatus.Done:
      return { name: "已完成", color: 'green'};
    case JobStatus.InProgress:
      return { name: "进行中", color: 'blue'};
    default:
      return { name: "未开始", color: ''};
  }
}

export function getStatusName(status: JobStatus) {
  const nameAndColor = getStatusNameAndColor(status)
  return h(Tag, { color: nameAndColor.color },()=>nameAndColor.name);
}

export interface CreateJobModel{
  jobName: string;
  jobStatus: JobStatus;
  startDate: string;
  endDate: string;
  parentId: number;
  supervisorId: string;
  description: string;
}

export interface UpdateJobModel{
  id: number;
  jobName: string;
  jobStatus: JobStatus;
  startDate: string;
  endDate: string;
  supervisorId: string;
  description: string;
}

export type JobPageListGetResultModel = BasicFetchResult<JobDetail>;

export type JobListGetResultModel = JobDetail[];

export type JobGanttListGetResultModel = JobGanttDetail[];

export interface jobUser {
  jobId: number;
  jobName: string;
  userId: number;
  userName: string;
}

export interface JobDetail{
  id: number;
  jobName: string;
  jobStatus: JobStatus;
  startDate: string;
  endDate: string;
  supervisorId: string;
  supervisorUserName: string;
  executorId: string;
  executorName: string;
  description: string;
  jobUsers: jobUser[];
  percent: number;
  rate: number;
}

export interface JobGanttDetail{
  id: number;
  text: string;
  progress: number;
  start_date: string;
}

export type JobDashboard = {
  jobStatus: JobStatus;
  jobs: JobDetail[]
}

export type JobParams = BasicPageParams & {
  jobName: string;
  jobStatus: JobStatus;
  includeChildren: boolean;
}
export interface JobToggleParams{

}
