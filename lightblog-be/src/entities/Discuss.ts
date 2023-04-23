import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Users } from "./Users";

@Index("fk_discuss_user_id", ["discussUser"], {})
@Index("fk_discuss_article_id", ["articleId"], {})
@Index("fk_discuss_parent_id", ["parentId"], {})
@Entity("discuss", { schema: "blog" })
export class Discuss {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "discuss_id",
    comment: "评论ID",
  })
  discussId: number;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "评论日期",
  })
  createTime: Date | null;

  @Column("int", { name: "discuss_user", nullable: true, comment: "发表用户" })
  discussUser: number | null;

  @Column("int", { name: "article_id", nullable: true, comment: "评论文章ID" })
  articleId: number | null;

  @Column("varchar", {
    name: "content",
    nullable: true,
    comment: "评论内容",
    length: 1024,
  })
  content: string | null;

  @Column("int", { name: "parent_id", nullable: true, comment: "父评论ID" })
  parentId: number | null;

  @ManyToOne(() => Article, (article) => article.discusses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;

  @ManyToOne(() => Discuss, (discuss) => discuss.discusses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "parent_id", referencedColumnName: "discussId" }])
  parent: Discuss;

  @OneToMany(() => Discuss, (discuss) => discuss.parent)
  discusses: Discuss[];

  @ManyToOne(() => Users, (users) => users.discusses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "discuss_user", referencedColumnName: "userId" }])
  discussUser2: Users;
}
