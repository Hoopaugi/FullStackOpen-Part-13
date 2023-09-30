import { Table, Model, Column, Unique, Scopes, DefaultScope, IsEmail, HasMany, BelongsToMany } from 'sequelize-typescript';

import Blog from '../blogs/Blog';
import ReadingListItem from '../readingListItems/ReadingListItem';
import { IUserAttributes, IUserCreationAttributes } from './users.types';

@DefaultScope(() => ({
  attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
}))

@Scopes(() => ({
  sensitive: {
    attributes: {
      include: ['password_hash']
    }
  }
}))

@Table({
  underscored: true,
})
class User extends Model<IUserAttributes, IUserCreationAttributes> {
  @Unique
  @IsEmail
  @Column
  username!: string;

  @Column
  name!: string;

  @Column
  passwordHash!: string;

  @Column
  disabled!: boolean;

  // Blog
  @HasMany(() => Blog)
  blogs!: Blog[]

  @BelongsToMany(() => Blog, () => ReadingListItem)
  readings!: Blog[];
}

export default User
