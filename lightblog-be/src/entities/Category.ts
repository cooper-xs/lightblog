import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    } from "typeorm";
import { tool } from "../utils/tool";
import { Article } from "./Article";

@Index("category_name", ["categoryName"], { unique: true })
@Index("category_alias_name", ["categoryAliasName"], { unique: true })
@Entity("category", { schema: "blog" })
export class Category {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "category_id",
        comment: "分类ID",
    })
    categoryId: number;

    @Column("varchar", {
        name: "category_name",
        unique: true,
        comment: "分类名称",
        length: 64,
    })
    categoryName: string;

    @Column("varchar", {
        name: "category_alias_name",
        unique: true,
        comment: "分类别名",
        length: 64,
    })
    categoryAliasName: string;

    @Column("varchar", {
        name: "description",
        nullable: true,
        comment: "分类描述",
        length: 128,
    })
    description: string | null;

    @Column("int", { 
        name: "parent_id", 
        nullable: true, 
        comment: "父分类ID. 如空则说明是父级分类" 
    })
    parentId: number | null;

    @Column("datetime", {
        name: "create_time",
        nullable: true,
        comment: "创建时间",
    })
    createTime: Date | null;

    @OneToMany(() => Article, (article) => article.category)
    articles: Article[];

    toViewCategory() {
        return {
            categoryId: this.categoryId,
            categoryName: this.categoryName,
            categoryAliasName: this.categoryAliasName,
            description: this.description,
            parentId: this.parentId,
            createTime: tool.formatDate(this.createTime),
        };
    }
}
