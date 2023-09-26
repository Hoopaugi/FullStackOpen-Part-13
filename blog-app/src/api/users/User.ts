import { Table, Model, Column, Unique, Scopes, DefaultScope, IsEmail, HasMany } from 'sequelize-typescript';

import Blog from '../blogs/Blog';
import { IUserAttributes, IUserCreationAttributes } from './users.types';

@DefaultScope(() => ({
  attributes: ['id', 'username', 'name'],
}))

@Scopes(() => ({
  full: {
    attributes: {
      include: ['passwordHash']
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
  passwordHash!: string;

  @HasMany(() => Blog)
  blogs!: Blog[]
}

export default User
