import { Optional } from "sequelize";

export interface IReadinglistAttributes {
  id: number
  blogId: number
  userId: number
}

export interface IReadinglistCreationAttributes extends Optional<IReadinglistAttributes, 'id'> {}
