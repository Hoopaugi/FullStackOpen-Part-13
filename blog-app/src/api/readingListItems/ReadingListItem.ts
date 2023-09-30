import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';

import Blog from '../blogs/Blog';
import User from '../users/User';
import { IReadingListItemAttributes, IReadingListItemCreationAttributes } from './readingListItems.types';

@Table({
  underscored: true,
})
class ReadingListItem extends Model<IReadingListItemAttributes, IReadingListItemCreationAttributes> {  
  @Column
  read!: boolean

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => Blog)
  @Column
  blogId!: number

  @BelongsTo(() => Blog)
  blog!: User
}

export default ReadingListItem
