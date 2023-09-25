import { Table, Column, Model, Default } from 'sequelize-typescript';

@Table
class Blog extends Model {
  @Column
  author?: string;

  @Column
  title!: string;

  @Column
  url!: string;

  @Default(0)
  @Column
  likes?: number;
}

export default Blog
