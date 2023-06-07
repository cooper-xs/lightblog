// 参数错误: 参数错误
export class ParamsError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'ArticleError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 数据校验错误: 格式不正确或数据非法 / 需要先修改关联项
export class DataValidationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'DataValidationError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 数据不存在错误: (关联)数据xx不存在..
export class DataNotFoundError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'DataNotFoundError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 没有admin权限
export class NoAdminError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'NoAdminError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}