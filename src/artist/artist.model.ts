import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Artist extends Model {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.BOOLEAN })
  grammy: boolean;
}
