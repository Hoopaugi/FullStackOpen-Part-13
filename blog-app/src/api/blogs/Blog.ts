import { Table, Model, Column, Default, BelongsTo, ForeignKey, Min, Max, DefaultScope } from 'sequelize-typescript';

import User from '../users/User';
import { IBlogAttributes, IBlogCreationAttributes } from './blogs.types';

@DefaultScope(() => ({
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [
    {
      model: User,
      as: 'user'
    }
  ]
}))

@Table({
  underscored: true,
})
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

  @BelongsTo(() => User)
  user!: User
}

export default Blog
