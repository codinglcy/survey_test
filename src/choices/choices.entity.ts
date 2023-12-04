import { AnswerEntity } from 'src/answers/answers.entity';
import { QuestionEntity } from 'src/questions/questions.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('choice')
export class ChoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  cnum: number;

  @Column('varchar', { length: 100 })
  content: string;

  @Column('int')
  score: number;

  @ManyToOne(() => QuestionEntity, (question) => question.choices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  question: QuestionEntity;

  @Column('uuid')
  questionId: string;

  @OneToOne(() => AnswerEntity, (answer) => answer.choice, { cascade: true })
  answer: AnswerEntity;
}
