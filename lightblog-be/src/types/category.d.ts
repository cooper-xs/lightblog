import { Category } from "../entities/Category";

export interface CategoryFamily {
    parent: ViewCategory;
    children: ViewCategory[];
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

export interface ViewCategory {
    categoryId: number;
    categoryName: string;
    categoryAliasName: string;
    description: string;
    parentId: number;
    createTime: string;
}