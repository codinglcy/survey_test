import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
class SurveyDto {
  @Field() readonly id?: string;
  @Field() readonly title: string;
  @Field({ nullable: true }) readonly notification: string;
  @Field({ nullable: true }) readonly finish: string;
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
class deleteResult {
  @Field() result: string;
}

export { SurveyDto, inputSurvey, updateSurvey, deleteResult };
