import 'reflect-metadata'
import { DataSource } from 'typeorm';
import { Article } from '../entities/Article';
import { ArticleTagReferenced } from '../entities/ArticleTagReferenced';
import { Category } from '../entities/Category';
import { Discuss } from '../entities/Discuss';
import { Tag } from '../entities/Tag';
import { Users } from '../entities/Users';
import { DATASOURCE } from '../config';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DATASOURCE.host,
    port: DATASOURCE.port,
    username: DATASOURCE.username,
    password: DATASOURCE.password,
    database: DATASOURCE.database,
    synchronize: DATASOURCE.synchronize,
    entities: [
        "src/entities/*.ts",
        Article,
        ArticleTagReferenced,
        Category,
        Discuss,
        Tag,
        Users
    ],
    migrations: [
        // "src/migrations/*.ts"
    ],
    subscribers: [
        // "src/subscribers/*.ts"
    ],
});

export const ArticleRepository = AppDataSource.getRepository(Article);
export const ArticleTagReferencedRepository = AppDataSource.getRepository(ArticleTagReferenced);
export const CategoryRepository = AppDataSource.getRepository(Category);
export const DiscussRepository = AppDataSource.getRepository(Discuss)
export const TagRepository = AppDataSource.getRepository(Tag)
export const UsersRepository = AppDataSource.getRepository(Users);