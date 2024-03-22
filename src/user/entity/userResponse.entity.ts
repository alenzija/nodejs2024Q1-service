import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserResponse {
  @ApiProperty({
    format: 'uui4',
  })
  @PrimaryColumn({
    type: 'uuid',
    nullable: false,
    unique: true,
  })
  id: string;

  @ApiProperty({ default: 'loginName' })
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  login: string;

  @ApiProperty({ default: 1 })
  @Column({
    type: 'int',
    nullable: false,
  })
  version: number;

  @ApiProperty()
  @Column({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty()
  @Column({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password?: string;
}
