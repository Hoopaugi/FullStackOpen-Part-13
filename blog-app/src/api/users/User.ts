import { Table, Model, Column, Unique } from 'sequelize-typescript';

import { IUserAttributes, IUserCreationAttributes } from './users.types';

@Table
class User extends Model<IUserAttributes, IUserCreationAttributes> {
  @Unique
  @Column
  username!: string;

  @Column
  name!: string;
}

export default User
