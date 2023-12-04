import { ChoiceEntity } from 'src/choices/choices.entity';
import { QuestionEntity } from 'src/questions/questions.entity';
import { SurveyEntity } from 'src/surveys/surveys.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('answer')
export class AnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SurveyEntity, (survey) => survey.answers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  survey: SurveyEntity;

  @Column('uuid')
  surveyId: string;

  @ManyToOne(() => QuestionEntity, (question) => question.answers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  question: QuestionEntity;

  @Column('uuid')
  questionId: string;

  @OneToOne(() => ChoiceEntity, (choice) => choice.answer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  choice: ChoiceEntity;

  @Column('uuid')
  choiceId: string;

  @Column('varchar', { length: 50 })
  user: string;
}
