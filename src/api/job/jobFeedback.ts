import { defHttp } from '/@/utils/http/axios';

import { CreateJobFeedbackModel, JobFeedbackModel } from '@/api/job/model/jobFeedbackModel';

export enum Api {
  Create = '/app/job-feedback',
}

export const createJobFeedback = (params?: CreateJobFeedbackModel) =>
  defHttp.post<JobFeedbackModel>(
    { url: Api.Create, params },
    { isTransformResponse: false },
  );
