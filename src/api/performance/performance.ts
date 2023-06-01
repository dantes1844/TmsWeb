import { defHttp } from '/@/utils/http/axios';
import {
  NoticeParams,
} from '@/api/notice/model/noticeModel';
import {
  PerformanceInput,
  PerformancePageListGetResultModel
} from '@/api/performance/model/PerformanceDetail';

enum Api {
  Pages = '/app/performance/pages',
  Create= '/app/performance',
  Get = '/app/performance',
  Update = '/app/performance',
  Delete = '/app/performance',
}

export const getPages = (params?: PerformanceInput) =>{
  return defHttp.get<PerformancePageListGetResultModel>(
    { url: Api.Pages, params },
    { isTransformResponse: false },
  );
}

