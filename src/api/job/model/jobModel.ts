import {BasicFetchResult} from "@/api/model/baseModel";

export enum JobStatus {
  UnStart=1,
  Doing=2,
  Canceled=4,
  Agreement=8,
  Finished=16
}

export interface CreateJobModel{
  jobName: string;
  jobStatus: JobStatus;
  startDate: string;
  endDate: string;
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
  description: string;
  members: jobUser[]
}

export interface JobParams{
  jobName: string;
  jobStatus: JobStatus;
}
export interface JobToggleParams{

}
