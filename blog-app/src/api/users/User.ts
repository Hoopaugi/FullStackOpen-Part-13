import { Table, Model, Column, Unique, Scopes, DefaultScope, IsEmail, HasMany } from 'sequelize-typescript';

import Blog from '../blogs/Blog';
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

  // Blog
  @HasMany(() => Blog)
  blogs!: Blog[]
}

export default User
