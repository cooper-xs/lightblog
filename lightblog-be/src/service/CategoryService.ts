import { CategoryRepository } from '../config/data-source';
import { Category } from '../entities/Category';
import { CategoryFamily, newCategory, updateCategory, ViewCategory } from '../types/category';

export default class CategoryService {
    /** 添加新分类 */
    public static async addCategory(params: newCategory): Promise<Category> {
        const category = new Category();
        category.categoryName = params.categoryName;
        category.categoryAliasName = params.categoryAliasName;
        category.description = params.description;
        category.parentId = params.parentId;
        category.createTime = new Date();
        return await CategoryRepository.save(category);
    }

    /** 修改分类 */
    public static async updateCategory(params: updateCategory): Promise<Category> {
        const category = await CategoryRepository.findOne({
            where: {
                categoryId: params.categoryId,
            },
        });
        category.categoryName = params.categoryName;
        category.categoryAliasName = params.categoryAliasName;
        category.description = params.description;
        category.parentId = params.parentId;
        return await CategoryRepository.save(category);
    }

    /** 删除分类 */
    public static async deleteCategory(id: number): Promise<Category> {
        const category = await CategoryRepository.findOne({
            where: {
                categoryId: id,
            },
        });
        return await CategoryRepository.remove(category);
    }

    /** 查询所有分类 */
    public static async getAllCategory(): Promise<CategoryFamily> {
        const res = await CategoryRepository.find();
        return {
            parent: null,
            children: res.map((item) => item.toViewCategory()),
        }
    }

    /** * 根据id查询分类 */
    public static async getCategoryById(id: number): Promise<ViewCategory> {
        const res = await CategoryRepository.findOne({
            where: {
                categoryId: id,
            },
        });
        return res.toViewCategory();
    }

    /** * 根据父标签id查询分类 */
    public static async getCategoryByParentId(id: number): Promise<CategoryFamily> {
        const res = await CategoryRepository.find({
            where: {
                parentId: id,
            },
        });
        return {
            parent: null,
            children: res.map((item) => item.toViewCategory()),
        }
    }

    /**
     * 根据分类名查询分类
     */
    public static async getCategoryByName(categoryName: string): Promise<Category> {
        const res = await CategoryRepository.findOne({
            where: {
                categoryName,
            },
        });
        return res;
    }

    /**
     * 根据分类别名查询分类
     */
    public static async getCategoryByAliasName(categoryAliasName: string): Promise<Category> {
        const res = await CategoryRepository.findOne({
            where: {
                categoryAliasName,
            },
        });
        return res;
    }
}