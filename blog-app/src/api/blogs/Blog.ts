import { Table, Model, Column, Default, BelongsTo, ForeignKey, Min, Max } from 'sequelize-typescript';

import User from '../users/User';
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

  @Min(1991)
  @Max(2023)
  @Column
  year!: number;

  @ForeignKey(() => User)
  @Column
  user_id!: number

  @BelongsTo(() => User)
  user!: User
}

export default Blog
