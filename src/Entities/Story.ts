import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm'

@Entity()
export class Story {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;

}
