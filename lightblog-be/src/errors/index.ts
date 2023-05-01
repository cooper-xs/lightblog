// 参数错误: 参数未填写..
export class ParamsError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'ArticleError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 数据校验错误: xx已存在..
export class DataValidationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'DataValidationError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}