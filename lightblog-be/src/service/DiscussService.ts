import { DiscussRepository } from "../config/data-source";
import { Discuss } from "../entities/Discuss";
import { newDiscuss, viewDiscuss } from "../types/Discuss";
import { tool } from "../utils/tool";

export default class DiscussService {
    public static async addDiscuss(params: newDiscuss): Promise<Discuss> {
        const discuss = new Discuss();
        discuss.articleId = params.articleId;
        discuss.userId = params.userId;
        discuss.content = params.content;
        discuss.createTime = new Date();
        discuss.parentId = params.parentId;
        const res = await DiscussRepository.save(discuss);
        return res;
    }

    public static async getDiscussById(discussId: number): Promise<viewDiscuss> {
        const res = await DiscussRepository.findOne({
            where: { discussId }
        });
        return res.toViewDiscusses();
    }

    public static async getDiscussByArticleId(articleId: number): Promise<viewDiscuss[]> {
        const res = await DiscussRepository.find({
            where: { articleId }
        });
        const viewDiscussList = res.map(item => ({
            discussId: item.discussId,
            createTime: tool.formatDate(item.createTime),
            userId: item.userId,
            articleId: item.articleId,
            content: item.content,
            parentId: item.parentId
        }));
        return viewDiscussList;
    }
}