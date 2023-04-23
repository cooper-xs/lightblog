import { CategoryRepository } from '../config/data-source';
import { Category } from '../entities/Category';

export default class CategoryService {
    public static async getAllCategory(): Promise<Category[]> {
        const res = await CategoryRepository.find();
        return res;
    }

    public static async getCategoryById(id: number): Promise<Category> {
        const res = await CategoryRepository.findOne({
            where: {
                categoryId: id,
            },
        });
        return res;
    }
}