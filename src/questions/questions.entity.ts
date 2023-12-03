import { AnswerEntity } from 'src/answers/answers.entity';
import { ChoiceEntity } from 'src/choices/choices.entity';
import { SurveyEntity } from 'src/surveys/surveys.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { nullable: true })
  qnum: number;

  @Column('varchar', { length: 100 })
  detail: string;

  @Column('boolean', { default: false })
  multi: boolean;

  @ManyToOne(() => SurveyEntity, (survey) => survey.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  survey: SurveyEntity;

  @Column('uuid')
  surveyId: string;

  @OneToMany(() => ChoiceEntity, (choice) => choice.question, {
    cascade: true,
    nullable: true,
  })
  choices: ChoiceEntity[];

  @OneToMany(() => AnswerEntity, (answer) => answer.question, {
    cascade: true,
    nullable: true,
  })
  answers: AnswerEntity[];
}
