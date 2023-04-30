import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as tool from '../utils/tool';
import { Article } from './Article';
import { Users } from './Users';

@Index('fk_discuss_user_id', ['userId'], {})
@Index('fk_discuss_article_id', ['articleId'], {})
@Index('fk_discuss_parent_id', ['parentId'], {})
@Entity('discuss', { schema: 'blog' })
export class Discuss {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'discuss_id',
    comment: '评论ID',
  })
  public discussId: number;

  @Column('datetime', {
    name: 'create_time',
    nullable: true,
    comment: '评论日期',
  })
  public createTime: Date | null;

  @Column('int', {
    name: 'user_id',
    nullable: true,
    comment: '发表用户',
  })
  public userId: number | null;

  @Column('int', {
    name: 'article_id',
    nullable: true,
    comment: '评论文章ID',
  })
  public articleId: number | null;

  @Column('varchar', {
    name: 'content',
    nullable: true,
    comment: '评论内容',
    length: 1024,
  })
  public content: string | null;

  @Column('int', {
    name: 'parent_id',
    nullable: true,
    comment: '父评论ID',
  })
  public parentId: number | null;

  @ManyToOne(() => Article, (article) => article.discusses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'article_id', referencedColumnName: 'articleId' }])
  public article: Article;

  @ManyToOne(() => Discuss, (discuss) => discuss.discusses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'parent_id', referencedColumnName: 'discussId' }])
  public parent: Discuss;

  @OneToMany(() => Discuss, (discuss) => discuss.parent)
  public discusses: Discuss[];

  @ManyToOne(() => Users, (users) => users.discusses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  public userId2: Users;

  public toViewDiscusses() {
    return {
      discussId: this.discussId,
      createTime: tool.formatDate(this.createTime),
      userId: this.userId,
      articleId: this.articleId,
      content: this.content,
      parentId: this.parentId,
      article: this.article,
      parent: this.parent,
      discusses: this.discusses,
      userId2: this.userId2,
    };
  }
}
