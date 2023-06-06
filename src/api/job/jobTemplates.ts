import { defHttp } from '/@/utils/http/axios';
import {
  CreateJobModel,
  JobDashboard,
  JobListGetResultModel,
  JobParams,
  UpdateJobModel,
} from '/@/api/job/model/jobModel';
import {JobTemplateDetail} from "@/api/job/model/jobTemplateModel";

export enum Api {
  BasicUrl = '/app/job-template',
}

export const getDashboards = (params?: JobParams) =>
  defHttp.get<JobDashboard[]>(
    { url: `${Api.BasicUrl}/dashboards`, params },
    { isTransformResponse: false },
  );
export const setJobStart = (id: number) =>
  defHttp.post<boolean>(
    { url: `${Api.BasicUrl}/${id}/start` },
    { isTransformResponse: false },
  );
export const setJobCancel = (id: number) =>
  defHttp.post<boolean>(
    { url: `${Api.BasicUrl}/${id}/cancel` },
    { isTransformResponse: false },
  );
export const getJobTemplatePages =  (params?: JobParams) =>
  defHttp.get<JobTemplateDetail[]>(
    { url: `${Api.BasicUrl}/pages`, params },
    { isTransformResponse: false },
  );



export const createJob = (params?: CreateJobModel) =>
  defHttp.post<JobListGetResultModel>(
    { url: Api.BasicUrl, params },
    { isTransformResponse: false },
  );

export const createSubJob = (params?: CreateJobModel) =>
  defHttp.post<JobListGetResultModel>(
    { url: `${Api.BasicUrl}/sub-job`, params },
    { isTransformResponse: false },
  );

export const updateJob = (params?: UpdateJobModel) =>
  defHttp.put<JobListGetResultModel>(
    { url: `${Api.BasicUrl}/${params?.id}`, params },
    { isTransformResponse: false },
  );

export const deleteJob = (id: number) =>
  defHttp.delete<JobListGetResultModel>(
    { url: `${Api.BasicUrl}/${id}` },
    { isTransformResponse: false },
  );
