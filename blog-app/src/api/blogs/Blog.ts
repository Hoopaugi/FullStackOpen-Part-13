import { Table, Model, Column, Default } from 'sequelize-typescript';

import { IBlogAttributes, IBlogCreationAttributes } from './blogs.types';

@Table
class Blog extends Model<IBlogAttributes, IBlogCreationAttributes> {
  @Column
  author!: string;

  @Column
  title!: string;

  @Column
  url!: string;

  @Default(0)
  @Column
  likes!: number;
}

export default Blog
