import {BasicFetchResult} from "@/api/model/baseModel";

export enum JobStatus {
  Todo=0,
  InProgress=1,
  FinalCheck=2,
  Done=3,
  Canceled=10,
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

export type JobDashboard = {
  jobStatus: JobStatus;
  jobs: JobDetail[]
}

export interface JobParams{
  jobName: string;
  jobStatus: JobStatus;
}
export interface JobToggleParams{

}
