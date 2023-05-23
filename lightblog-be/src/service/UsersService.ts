import { Context } from 'koa';
import { Users } from '../entities/Users';
import { newUser } from '../types/user';
import { UsersRepository } from '../config/data-source';

export default class UsersService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async addUser(params: newUser): Promise<Users> {
    const user = new Users();
    user.userNickname = params.userNickname;
    user.email = params.email;
    user.createTime = new Date();
    const res = await UsersRepository.save(user);
    return res;
  }

  public async deleteUser(userId: number): Promise<Users> {
    const user = await UsersRepository.findOne({
      where: { userId: userId },
    });
    const res = await UsersRepository.remove(user);
    return res;
  }

  public async getUserByEmail(email: string): Promise<Users> {
    const res = await UsersRepository.findOne({
      where: { email: email },
    });
    if (!res) {
      return null;
    }
    return res;
  }

  public async getUserByNickname(userNickname: string): Promise<Users> {
    const res = await UsersRepository.findOne({
      where: { userNickname: userNickname },
    });
    if (!res) {
      return null;
    }
    return res;
  }

  public async getUserListAll(): Promise<Users[]> {
    return await UsersRepository.find();
  }

  public async getUserById(userId: number): Promise<Users> {
    const res = await UsersRepository.findOne({
      where: {
        userId: userId,
      },
    });
    if (!res) {
      return null;
    }
    return res;
  }

  public async updateUser(params: Users): Promise<Users> {
    const user = await UsersRepository.findOne({
      where: { userId: params.userId },
    });
    user.userNickname = params.userNickname;
    user.email = params.email;
    const res = await UsersRepository.save(user);
    return res;
  }
}
