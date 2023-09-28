import { Table, Model, Column, Default, BelongsTo, ForeignKey, Min, Max, BelongsToMany } from 'sequelize-typescript';

import User from '../users/User';
import Readinglist from '../readinglist/Readinglist';
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
  published!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User, 'userId')
  user!: User

  @BelongsToMany(() => User, () => Readinglist)
  readers!: User[]
}

export default Blog
