import { Category } from "../entities/Category";

export interface CategoryFamily {
    parent: Category;
    children: Category[];
}

export interface newCategory {
    categoryName: string;
    categoryAliasName: string;
    description?: string;
    parentId?: number;
}

export interface updateCategory {
    categoryId: number;
    categoryName: string;
    categoryAliasName: string;
    description?: string;
    parentId?: number;
}