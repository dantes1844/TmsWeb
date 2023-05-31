import { BasicFetchResult, BasicPageParams } from '@/api/model/baseModel';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export type SystemLog = {
  level: string;
  template: string;

  message: string;

  exception: string;

  properties: string;

  timestamp: string;
}

export type SystemLogInput ={

}


export type ErrorLog = {
  level: string;
  template: string;

  message: string;

  exception: string;

  properties: string;

  timestamp: string;
}

export type ErrorLogInput ={

}

export type UserLog = {

  userName: string;

  executionTime: string;

  clientIpAddress: string;

  browserInfo: string;

  url: string;

  httpMethod: string;

  httpStatusCode: number;

  properties: string;

  executionTime: string;
}
export type UserLogInput ={

}
