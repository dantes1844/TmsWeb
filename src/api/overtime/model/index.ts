export type OvertimeDetail = {
  id: number;
  date: string;
  content: string;
  hours: number;
  userId: string;
  userName: string;
  supervisorId: string;
  supervisorName: string;
  isVerified: boolean;
};

export type CreateOvertime = {
  date: string;
  content: string;
  hours: number;
  userId: string;
  supervisorId: string;
};

export type UpdateOvertime = {
  id: number;
  date: string;
  content: string;
  hours: number;
  userId: string;
  supervisorId: string;
};

export type OvertimeParams = {
  isVerified?: boolean;
  userName: string;
  date: string;
};
