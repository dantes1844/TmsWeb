/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  userNameOrEmailAddress: string;
  password: string;
  rememberMe?: boolean;
}

export interface TokenParams {
  grant_type?: string;
  client_id?: string;
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}
/**
 * @description: 拿令牌返回值的对象
 */
export interface TokenResultModel {
  expires_in: number;
  access_token: string;
  token_type: string;
}

export interface LoginResultWithoutToken {
  result: number;
  description: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface AbpUserInfoModel {
  name: string;
  userName: string;
  roles: string[];
  email: string;
  id: string;
}

export interface ResetPasswordModel {
  userId: string;
  password: string;
  oldPassword: string;

  resetToken: string;
}
