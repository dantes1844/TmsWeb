// 事件总线第三方库：
import mitt from 'mitt';

const bus = mitt();

enum EventBusType {
  ResetDeptId = 'ResetDeptId',
}
export { bus, EventBusType };
