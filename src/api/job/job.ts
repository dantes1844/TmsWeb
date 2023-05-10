import { defHttp } from '/@/utils/http/axios';
import {
  CreateJobModel, JobDashboard, JobDetail,
  JobListGetResultModel,
  JobParams, JobStatus,
  JobToggleParams, TaskDetail, UpdateJobModel,
} from '/@/api/job/model/jobModel';

enum Api {
  JobPages = '/app/job/pages',
  CreateJob = '/app/job',
  UpdateJob = '/app/job',
  AddSubJob = '/app/job/sub-job',
  DeleteJob = '/app/job',
  ToggleJobDisabled = '/job/toggle',
  AllJobs = '/app/job',
  JobDashboard='/app/job/dashboards'
}

export const getDashboards = (params?: JobParams) =>
  defHttp.get<JobDashboard[]>(
    { url: Api.JobDashboard, params },
    { isTransformResponse: false },
  );
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

export const createSubJob = (params?: CreateJobModel) =>
  defHttp.post<JobListGetResultModel>(
    { url: Api.AddSubJob, params },
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
