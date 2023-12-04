import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AnswerEntity } from 'src/answers/answers.entity';
import { ChoiceEntity } from 'src/choices/choices.entity';

@ObjectType()
class QuestionDto {
  @Field() readonly id?: string;
  @Field({ nullable: true }) readonly qnum: number;
  @Field() readonly detail: string;
  @Field() readonly multi: boolean;
  @Field() readonly surveyId: string;
  // @Field(() => [ChoiceEntity], { nullable: true })
  // readonly choices: ChoiceEntity[];
  // @Field(() => [AnswerEntity], { nullable: true })
  // readonly answers: AnswerEntity[];
}

@InputType()
class inputQuestion {
  @Field({ nullable: true }) readonly qnum: number;
  @Field() readonly detail: string;
  @Field({ nullable: true }) readonly multi: boolean;
  @Field() readonly surveyId: string;
}

@InputType()
class updateQuestion {
  @Field() readonly id?: string;
  @Field({ nullable: true }) readonly qnum: number;
  @Field() readonly detail: string;
  @Field({ nullable: true }) readonly multi: boolean;
  @Field() readonly surveyId: string;
}

@ObjectType()
class deleteQuestionResult {
  @Field() result: string;
}

export { QuestionDto, inputQuestion, updateQuestion, deleteQuestionResult };
