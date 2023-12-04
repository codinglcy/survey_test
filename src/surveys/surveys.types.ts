import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AnswerEntity } from 'src/answers/answers.entity';
import { QuestionEntity } from 'src/questions/questions.entity';

@ObjectType()
class SurveyDto {
  @Field() readonly id?: string;
  @Field() readonly title: string;
  @Field({ nullable: true }) readonly notification?: string;
  @Field({ nullable: true }) readonly finish?: string;
  // @Field(() => [QuestionEntity], { nullable: true })
  // readonly questions?: QuestionEntity[];
  // @Field(() => [AnswerEntity], { nullable: true })
  // readonly answers: AnswerEntity[];
}

@InputType()
class inputSurvey {
  @Field() readonly title: string;
  @Field({ nullable: true }) readonly notification: string;
  @Field({ nullable: true }) readonly finish: string;
}

@InputType()
class updateSurvey {
  @Field() readonly id: string;
  @Field() readonly title: string;
  @Field({ nullable: true }) readonly notification: string;
  @Field({ nullable: true }) readonly finish: string;
}

@ObjectType()
class deleteSurveyResult {
  @Field() result: string;
}

export { SurveyDto, inputSurvey, updateSurvey, deleteSurveyResult };
