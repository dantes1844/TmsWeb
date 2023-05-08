import { defHttp } from '/@/utils/http/axios';
import {
  CreateJobModel,
  JobListGetResultModel,
  JobParams,
  JobToggleParams, UpdateJobModel,
} from '/@/api/job/model/jobModel';

enum Api {
  JobPages = '/app/job/pages',

  CreateJob = '/app/job',

  UpdateJob = '/app/job',

  DeleteJob = '/app/job',

  ToggleJobDisabled = '/job/toggle',

  AllJobs = '/app/job',
}

export const getJobPages = (params?: JobParams) =>
  defHttp.get<JobListGetResultModel>(
    { url: Api.JobPages, params },
    { isTransformResponse: false },
  );
export const getJobList = (params?: JobParams) =>
  defHttp.get<JobListGetResultModel>(
    { url: Api.AllJobs, params },
    { isTransformResponse: false }
  );

export const createJob = (params?: CreateJobModel) =>
  defHttp.post<JobListGetResultModel>(
    { url: Api.CreateJob, params },
    { isTransformResponse: false },
  );

export const updateJob = (params?: UpdateJobModel) =>
  defHttp.put<JobListGetResultModel>(
    { url: `${Api.UpdateJob}/${params?.id}`, params },
    { isTransformResponse: false },
  );

export const deleteJob = (id: number) =>
  defHttp.delete<JobListGetResultModel>(
    { url: `${Api.DeleteJob}/${id}` },
    { isTransformResponse: false },
  );

export const toggleJobDisabled = (params?: JobToggleParams) =>
  defHttp.post<JobListGetResultModel>(
    { url: Api.ToggleJobDisabled, params },
    { isTransformResponse: false },
  );
