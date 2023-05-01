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
    await UsersRepository.save(user);
    return user;
  }

  public async deleteUser(userId: number): Promise<Users> {
    const user = await UsersRepository.findOne({
      where: { userId: userId },
    });
    await UsersRepository.remove(user);
    return user;
  }

  public async getUserByEmail(email: string): Promise<Users | undefined> {
    return await UsersRepository.findOne({
      where: { email: email },
    });
  }

  public async getUserByNickname(userNickname: string): Promise<Users | undefined> {
    return await UsersRepository.findOne({
      where: { userNickname: userNickname },
    });
  }

  public async getUserListAll(): Promise<Users[]> {
    return await UsersRepository.find();
  }

  public async getUserById(userId: number): Promise<Users | undefined> {
    return await UsersRepository.findOne({
      where: {
        userId: userId,
      },
    });
  }
}
