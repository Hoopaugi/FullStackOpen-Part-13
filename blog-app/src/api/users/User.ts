import { Table, Model, Column, Unique, Scopes, DefaultScope, IsEmail, HasMany, BelongsToMany } from 'sequelize-typescript';

import Blog from '../blogs/Blog';
import Readinglist from '../readinglist/Readinglist';
import { IUserAttributes, IUserCreationAttributes } from './users.types';

@DefaultScope(() => ({
  attributes: ['id', 'username', 'name'],
}))

@Scopes(() => ({
  full: {
    attributes: {
      include: ['password_hash']
    }
  }
}))

@Table
class User extends Model<IUserAttributes, IUserCreationAttributes> {
  @Unique
  @IsEmail
  @Column
  username!: string;

  @Column
  name!: string;

  @Column
  password_hash!: string;

  // Blog
  @HasMany(() => Blog, 'userId')
  blogs!: Blog[]

  // Readinglist
  @BelongsToMany(() => Blog, () => Readinglist, 'userId')
  readings!: Blog[]
}

export default User
