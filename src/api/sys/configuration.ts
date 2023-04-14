import { defHttp } from '/@/utils/http/axios';

import { ErrorMessageMode } from '/#/axios';
import { Configuration } from '/@/store/modules/configuration';

enum Api {
  GetConfiguration = '/abp/application-configuration',
}

/**
 * @description: 拿当前用户的配置信息
 */
export function getConfigurationApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<Configuration>(
    {
      url: Api.GetConfiguration,
    },
    {
      errorMessageMode: mode,
      isTransformResponse: false,
    },
  );
}
