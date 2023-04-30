import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';
import { ArticleTagReferenced } from './ArticleTagReferenced';
import { Discuss } from './Discuss';

@Index('title', ['title'], { unique: true })
@Index('post_alias_name', ['postAliasName'], { unique: true })
@Index('fk_article_category_id', ['categoryId'], {})
@Entity('article', { schema: 'blog' })
export class Article {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'article_id',
    comment: '博文ID',
  })
  public articleId: number;

  @Column('varchar', {
    name: 'title',
    nullable: true,
    unique: true,
    comment: '博文标题',
    length: 190,
  })
  public title: string | null;

  @Column('varchar', {
    name: 'post_alias_name',
    nullable: true,
    unique: true,
    comment: '博文别名/路径名',
    length: 100,
  })
  public postAliasName: string | null;

  @Column('int', {
    name: 'comment_count',
    nullable: true,
    comment: '评论数',
  })
  public commentCount: number | null;

  @Column('int', {
    name: 'read_count',
    nullable: true,
    comment: '浏览量',
  })
  public readCount: number | null;

  @Column('int', {
    name: 'top_flag',
    nullable: true,
    comment: '置顶等级, 不为0则置顶',
  })
  public topFlag: number | null;

  @Column('datetime', {
    name: 'create_time',
    nullable: true,
    comment: '创建时间',
  })
  public createTime: Date | null;

  @Column('datetime', {
    name: 'push_date',
    nullable: true,
    comment: '发布日期',
  })
  public pushDate: Date | null;

  @Column('text', {
    name: 'content_md',
    nullable: true,
    comment: '文章markdown内容',
  })
  public contentMd: string | null;

  @Column('text', {
    name: 'content_html',
    nullable: true,
    comment: '文章html内容',
  })
  public contentHtml: string | null;

  @Column('varchar', {
    name: 'article_summary',
    nullable: true,
    comment: '文章摘要',
    length: 190,
  })
  public articleSummary: string | null;

  @Column('varchar', {
    name: 'preview_image_url',
    nullable: true,
    comment: '预览图片链接',
    length: 255,
  })
  public previewImageUrl: string | null;

  @Column('int', {
    name: 'category_id',
    nullable: true,
    comment: '分类ID',
  })
  public categoryId: number | null;

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    {
      name: 'category_id',
      referencedColumnName: 'categoryId',
    },
  ])
  public category: Category;

  @OneToMany(() => ArticleTagReferenced, (articleTagReferenced) => articleTagReferenced.article)
  public articleTagReferenceds: ArticleTagReferenced[];

  @OneToMany(() => Discuss, (discuss) => discuss.article)
  public discusses: Discuss[];
}
