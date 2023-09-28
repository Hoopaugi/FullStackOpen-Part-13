import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';

import Blog from '../blogs/Blog';
import User from '../users/User';
import { IReadinglistAttributes, IReadinglistCreationAttributes } from './readinglist.types';

@Table
class Readinglist extends Model<IReadinglistAttributes, IReadinglistCreationAttributes> {  
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Blog)
  @Column
  blogId!: number;
}

export default Readinglist
