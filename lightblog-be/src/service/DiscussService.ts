import { Context } from 'koa';
import { DiscussRepository } from '../config/data-source';
import { Discuss } from '../entities/Discuss';
import { newDiscuss, viewDiscuss } from '../types/Discuss';
import { tool } from '../utils/tool';

export default class DiscussService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async addDiscuss(params: newDiscuss): Promise<Discuss> {
    const discuss = new Discuss();
    discuss.articleId = params.articleId;
    discuss.userId = params.userId;
    discuss.content = params.content;
    discuss.createTime = new Date();
    discuss.parentId = params.parentId;
    const res = await DiscussRepository.save(discuss);
    return res;
  }

  public async getDiscussList(): Promise<viewDiscuss[]> {
    const res = await DiscussRepository.find();
    const viewDiscussList = res.map((item) => ({
      discussId: item.discussId,
      createTime: tool.formatDate(item.createTime),
      userId: item.userId,
      articleId: item.articleId,
      content: item.content,
      parentId: item.parentId,
    }));
    return viewDiscussList;
  }

  public async getDiscussById(discussId: number): Promise<viewDiscuss> {
    const res = await DiscussRepository.findOne({
      where: { discussId },
    });
    if (!res) {
      return null;
    }
    return res.toViewDiscusses();
  }

  public async getDiscussByArticleId(articleId: number): Promise<viewDiscuss[]> {
    const res = await DiscussRepository.find({
      where: { articleId },
    });
    const viewDiscussList = res.map((item) => ({
      discussId: item.discussId,
      createTime: tool.formatDate(item.createTime),
      userId: item.userId,
      articleId: item.articleId,
      content: item.content,
      parentId: item.parentId,
    }));
    return viewDiscussList;
  }

  public async getDiscussListByUserId(userId: number): Promise<Discuss[]> {
    const res = await DiscussRepository.find({
      where: { userId },
    });
    if (!res) {
      return null;
    }
    return res;
  }

  public async deleteDiscussById(discussId: number): Promise<Discuss> {
    const res = await DiscussRepository.findOne({
      where: { discussId },
    });
    if (!res) {
      return null;
    }
    const discuss = await DiscussRepository.remove(res);
    return discuss;
  }

  // public async deleteDiscussByUserId(userId: number): Promise<Discuss> {
  //   const res = await DiscussRepository.find({
  //     where: { 
  //       userId: userId,
  //     },
  //   });
  //   if (!res) {
  //     return null;
  //   }
  //   // return await DiscussRepository.remove(res);
  //   return res.forEach(async (item) => {
  //     await DiscussRepository.remove(item);
  //   });
  // }
}
