import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('survey')
export class SurveyEntity {
  @PrimaryGeneratedColumn('uuid') id: String;

  @Column('varchar', { length: 50 })
  title!: string;

  @Column('varchar', { length: 50, nullable: true })
  finish?: string;
}
