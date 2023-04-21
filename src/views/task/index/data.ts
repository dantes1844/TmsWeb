export enum TaskStatus {
  Todo=0,
  InProgress=1,
  FinalCheck=2,
  Done=3
}

export interface TaskDetail{
  id: number;
  title: string;
  description: string;
  supervisor: string;
  members: string[];
  startDate: string;
  endDate: string;
  status: TaskStatus;
}

export const ToDoList: TaskDetail[] =[
  {
    id:1,
    title: '变电站维修',
    description: '计划要在停机期间，对变电站进行维修工作，工期预计15天',
    startDate: '2023-04-01',
    endDate: '2023-04-15',
    supervisor: '老白',
    members: ['张三','李四','王五'],
    status: TaskStatus.Todo
  },
  {
    id: 2,
    title: '括建厂站启动会',
    description: '这里字会多一点啦，要仔细看看',
    startDate: '2023-04-08',
    endDate: '2023-04-12',
    supervisor: '工程部',
    members: ['张三','王五'],
    status: TaskStatus.Todo
  },
  {
    id:3,
    title: '新建二号厂站启动会',
    description: '二号的厂站啦，这里字会多一点啦，要仔细看看',
    startDate: '2023-04-01',
    endDate: '2023-04-15',
    supervisor: '销售部',
    members: ['李四','王五'],
    status: TaskStatus.Todo
  },
]
export const InProgressList: TaskDetail[] =[
  {
    id:5,
    title: '公司安全审查考核',
    description: '集团组织的公司层面安全检查考核工作，在本公司预计进行5天',
    startDate: '2023-04-20',
    endDate: '2023-04-25',
    supervisor: '老白',
    members: ['张三','李四','王五'],
    status: TaskStatus.InProgress
  },
  {
    id: 6,
    title: '线路维护及定值重新维护工作',
    description: '对某条线路的检修维护工作，以及定值重新设置',
    startDate: '2023-04-18',
    endDate: '2023-04-25',
    supervisor: '工程部',
    members: ['找往北','陈向东'],
    status: TaskStatus.InProgress
  },
]
export const FinalCheckList: TaskDetail[] =[
  {
    id: 8,
    title: '新建二号厂站启动会',
    description: '二号的厂站啦，这里字会多一点啦，要仔细看看',
    startDate: '2023-04-01',
    endDate: '2023-04-15',
    supervisor: '销售部',
    members: ['李四','王五'],
    status: TaskStatus.FinalCheck
  },
  {
    id: 16,
    title: '线路维护及定值重新维护工作',
    description: '对某条线路的检修维护工作，以及定值重新设置',
    startDate: '2023-04-18',
    endDate: '2023-04-25',
    supervisor: '工程部',
    members: ['赵往北','陈向东'],
    status: TaskStatus.FinalCheck
  },
]
export const DoneList: TaskDetail[] =[
  {
    id: 7,
    title: '一号变电站年度巡检工作',
    description: '一号变电站年度巡检工作',
    startDate: '2023-04-01',
    endDate: '2023-04-15',
    supervisor: '维护部',
    members: ['曾三顺','曹世界'],
    status: TaskStatus.Done
  },
  {
    id: 11,
    title: '年度采购工作',
    description: '采购统计，招投标，采购流程完成',
    startDate: '2023-03-18',
    endDate: '2023-03-25',
    supervisor: '采购部',
    members: ['李树林','易中地'],
    status: TaskStatus.Done
  },
]
