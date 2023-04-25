import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Tag } from "./Tag";

@Index("fk_atr_article_id", ["articleId"], {})
@Index("fk_atr_tag_id", ["tagId"], {})
@Entity("article_tag_referenced", { schema: "blog" })
export class ArticleTagReferenced {
    @PrimaryGeneratedColumn({ 
        type: "int", 
        name: "atr_Id", 
        comment: "引用id" })
    atrId: number;

    @Column("int", { 
        name: "article_id", 
        nullable: true, 
        comment: "文章id" })
    articleId: number | null;

    @Column("int", { 
        name: "tag_id", 
        nullable: true, 
        comment: "标签id" })
    tagId: number | null;

    @ManyToOne(() => Article, (article) => article.articleTagReferenceds, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ 
        name: "article_id", 
        referencedColumnName: "articleId" }])
    article: Article;

    @ManyToOne(() => Tag, (tag) => tag.articleTagReferenceds, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ 
        name: "tag_id", 
        referencedColumnName: "tagId" }])
    tag: Tag;
}
