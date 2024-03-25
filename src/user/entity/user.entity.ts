import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    format: 'uui4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ default: 'loginName' })
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  login: string;

  @ApiProperty({ default: 1 })
  @VersionColumn()
  version: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password?: string;
}
