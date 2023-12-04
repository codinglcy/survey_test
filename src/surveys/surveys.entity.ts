import { AnswerEntity } from 'src/answers/answers.entity';
import { QuestionEntity } from 'src/questions/questions.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('survey')
export class SurveyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('varchar', { length: 500, nullable: true })
  notification: string;

  @Column('varchar', { length: 50, nullable: true })
  finish: string;

  @OneToMany(() => QuestionEntity, (question) => question.survey, {
    cascade: true,
    nullable: true,
  })
  questions: QuestionEntity[];

  @OneToMany(() => AnswerEntity, (answer) => answer.survey, {
    cascade: true,
    nullable: true,
  })
  answers: AnswerEntity[];
}
