import { Table, Model, Column, Unique, Scopes, DefaultScope, IsEmail } from 'sequelize-typescript';

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
}

export default User
