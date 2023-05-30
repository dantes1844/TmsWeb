export interface CreateJobFeedbackModel {
  jobId: number;
  comment: string;
  percent: number;
}

export interface JobFeedbackModel {
  jobId: number;
  jobName: string;
  creatorId: string;
  userName: string;
  comment: string;
  percent: number;
}
