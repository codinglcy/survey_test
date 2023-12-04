import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
class AnswerDto {
  @Field() readonly id?: string;
  @Field() readonly surveyId: string;
  @Field() readonly questionId: string;
  @Field() readonly choiceId: string;
  @Field() readonly user: string;
}

@InputType()
class inputAnswer {
  @Field() readonly surveyId: string;
  @Field() readonly questionId: string;
  @Field() readonly choiceId: string;
  @Field() readonly user: string;
}

@InputType()
class updateAnswer {
  @Field() readonly id?: string;
  @Field() readonly surveyId: string;
  @Field() readonly questionId: string;
  @Field() readonly choiceId: string;
  @Field() readonly user: string;
}

@ObjectType()
class deleteAnswerResult {
  @Field() result: string;
}

export { AnswerDto, inputAnswer, updateAnswer, deleteAnswerResult };
