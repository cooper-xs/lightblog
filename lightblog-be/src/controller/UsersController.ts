import { Context } from 'koa';
import { DataNotFoundError, DataValidationError, ParamsError } from '../errors';
import DiscussService from '../service/DiscussService';
import UsersService from '../service/UsersService';
import { newUser } from '../types/user';
import { tool } from '../utils/tool';

export default class UsersController {
  // 依赖注入
  private readonly _usersService: UsersService;
  private readonly _discussService: DiscussService;
  public constructor(private readonly ctx: Context) {
    this._usersService = new UsersService(ctx);
    this._discussService = new DiscussService(ctx);
  }

  /** 通过邮箱查询用户 */
  public async getUserByEmail() {
    let { email } = this.ctx.query;

    if (!email) {
      throw new ParamsError('用户邮箱不能为空');
    }

    if (!tool.checkEmail(email)) {
      throw new DataValidationError('用户邮箱格式不正确');
    }

    const user = await this._usersService.getUserByEmail(email);

    if(!user) {
      return null;
    }

    return user;
  }

  /** 注册新用户 */
  public async addUser() {
    let { userNickname, email } = this.ctx.request.body;

    if (!userNickname) {
      throw new ParamsError('用户昵称不能为空');
    }
    if (!email) {
      throw new ParamsError('用户邮箱不能为空');
    }

    if (await this._usersService.getUserByNickname(userNickname)) {
      throw new DataValidationError('用户昵称已存在');
    }

    if (!tool.checkEmail(email)) {
      throw new DataValidationError('用户邮箱格式不正确');
    }

    if (await this._usersService.getUserByEmail(email)) {
      throw new DataValidationError('用户邮箱已存在');
    }

    const params: newUser = {
      userNickname,
      email,
    };

    const user = await this._usersService.addUser(params);

    return user;
  }

  /** 获取用户列表 */
  public async getUserListAll() {
    const userList = await this._usersService.getUserListAll();

    return userList;
  }

  /** 根据id删除用户 */
  public async deleteUser() {
    let { userId } = this.ctx.query;

    userId = tool.toNumber(userId);

    if (!userId) {
      throw new ParamsError('用户ID不能为空');
    }

    if (!(await this._usersService.getUserById(userId))) {
      throw new DataValidationError('用户不存在');
    }

    // 删除用户相关的评论
    const discussList = await this._discussService.getDiscussListByUserId(userId);
    if (discussList.length) {
      await this._discussService.deleteDiscussByUserId(userId);
      this.ctx.warn('删除用户相关评论成功, 用户id = ', userId);
    }

    const res = await this._usersService.deleteUser(userId);

    return res;
  }
}
