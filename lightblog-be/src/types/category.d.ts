import { Category } from "../entities/Category";

export interface CategoryFamily {
    parent: Category;
    children: Category[];
}