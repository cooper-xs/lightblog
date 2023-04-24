import { CategoryRepository } from '../config/data-source';
import { Category } from '../entities/Category';
import { CategoryFamily } from '../types/category';

export default class CategoryService {
    public static async getAllCategory(): Promise<CategoryFamily> {
        const res = await CategoryRepository.find();
        return {
            parent: null,
            children: res,
        }
    }

    public static async getCategoryById(id: number): Promise<Category> {
        const res = await CategoryRepository.findOne({
            where: {
                categoryId: id,
            },
        });
        return res;
    }

    public static async getCategoryByParentId(id: number): Promise<CategoryFamily> {
        const res = await CategoryRepository.find({
            where: {
                parentId: id,
            },
        });
        return {
            parent: null,
            children: res,
        }
    }
}