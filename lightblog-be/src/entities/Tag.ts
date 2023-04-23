import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticleTagReferenced } from "./ArticleTagReferenced";

@Index("tag_name", ["tagName"], { unique: true })
@Index("tag_alias_name", ["tagAliasName"], { unique: true })
@Entity("tag", { schema: "blog" })
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_id", comment: "标签ID" })
  tagId: number;

  @Column("varchar", {
    name: "tag_name",
    unique: true,
    comment: "标签名称",
    length: 64,
  })
  tagName: string;

  @Column("varchar", {
    name: "tag_alias_name",
    unique: true,
    comment: "标签别名",
    length: 64,
  })
  tagAliasName: string;

  @Column("varchar", {
    name: "description",
    nullable: true,
    comment: "标签描述",
    length: 128,
  })
  description: string | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
  })
  createTime: Date | null;

  @OneToMany(
    () => ArticleTagReferenced,
    (articleTagReferenced) => articleTagReferenced.tag
  )
  articleTagReferenceds: ArticleTagReferenced[];
}
