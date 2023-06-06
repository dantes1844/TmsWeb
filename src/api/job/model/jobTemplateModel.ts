import {JobStatus} from "@/api/job/model/jobModel";

export interface CreateJobModel{
  jobName: string;
  jobStatus: JobStatus;
  startDate: string;
  endDate: string;
  parentId: number;
  supervisorId: string;
  description: string;
}

export type JobTemplateItem = {
  jobName: string;
  supervisorId?: string;
  executorId?: string;
  startDate: string;
  endDate: string;
}

export interface JobTemplateDetail{
  id: number;
  templateName: string;
  templateFile: string;
  jobs: JobTemplateItem[];
}
