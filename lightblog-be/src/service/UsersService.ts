import { Users } from '../entities/Users';
import { newUser } from '../types/user';
import { UsersRepository } from '../config/data-source';

export default class UsersService {
  public static async addUser(params: newUser): Promise<Users> {
    const user = new Users();
    user.userNickname = params.userNickname;
    user.email = params.email;
    user.createTime = new Date();
    await UsersRepository.save(user);
    return user;
  }

  public static async deleteUser(userId: number): Promise<Users> {
    const user = await UsersRepository.findOne({
      where: { userId: userId },
    });
    await UsersRepository.remove(user);
    return user;
  }

  public static async getUserByEmail(email: string): Promise<Users | undefined> {
    return await UsersRepository.findOne({
      where: { email: email },
    });
  }

  public static async getUserByNickname(userNickname: string): Promise<Users | undefined> {
    return await UsersRepository.findOne({
      where: { userNickname: userNickname },
    });
  }

  public static async getUserList(): Promise<Users[]> {
    return await UsersRepository.find();
  }

  public static async getUserById(userId: number): Promise<Users | undefined> {
    return await UsersRepository.findOne({
      where: {
        userId: userId,
      },
    });
  }
}
