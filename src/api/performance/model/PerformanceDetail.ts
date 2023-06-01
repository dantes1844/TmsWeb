import { BasicFetchResult } from '@/api/model/baseModel';

export type PerformanceInput = {
  user: string;
  maxScore?:number;
  minScore?:number;
}

export interface PerformanceDetail{
  user: string;
  score: number;
  totalJob: number;
  finishedJob: number;
  averageScore: number;
}

export type PerformancePageListGetResultModel = BasicFetchResult<PerformanceDetail>;
