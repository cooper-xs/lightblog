import { Context } from 'koa';
import UsersService from '../service/UsersService';
import { newUser } from '../types/user';
import * as tool from '../utils/tool';

export default class UsersController {
  // 依赖注入
  private readonly _usersService: UsersService;
  public constructor(private readonly ctx: Context) {
    this._usersService = new UsersService(ctx);
  }

  /** 注册新用户 */
  public async addUser(ctx: Context) {
    try {
      let { userNickname, email } = ctx.request.body;

      if (!userNickname) {
        ctx.fail('用户昵称不能为空');
        return;
      }
      if (!email) {
        ctx.fail('用户邮箱不能为空');
        return;
      }

      if (await this._usersService.getUserByNickname(userNickname)) {
        ctx.fail('用户昵称已存在');
        return;
      }

      if (!tool.checkEmail(email)) {
        ctx.fail('用户邮箱格式不正确');
        return;
      }

      if (await this._usersService.getUserByEmail(email)) {
        ctx.fail('用户邮箱已存在');
        return;
      }

      const params: newUser = {
        userNickname,
        email,
      };

      const user = await this._usersService.addUser(params);

      console.log(user);

      ctx.success('添加新用户成功', user);
    } catch (err) {
      console.log(err);
      ctx.fail('添加新用户失败');
    }
  }

  /** 获取用户列表 */
  public async getUserListAll(ctx: Context) {
    try {
      const userList = await this._usersService.getUserListAll();

      ctx.success('获取用户列表成功', userList);
    } catch (err) {
      console.log(err);
      ctx.fail('获取用户列表失败');
    }
  }

  /** 根据id删除用户 */
  public async deleteUser(ctx: Context) {
    try {
      let { userId } = ctx.params;

      userId = tool.toNumber(userId);

      if (!userId) {
        ctx.fail('用户id不能为空');
        return;
      }

      if (!(await this._usersService.getUserById(userId))) {
        ctx.success('用户已删除或不存在');
        return;
      }

      await this._usersService.deleteUser(userId);

      ctx.success('删除用户成功');
    } catch (err) {
      console.log(err);
      ctx.fail('删除用户失败');
    }
  }
}
