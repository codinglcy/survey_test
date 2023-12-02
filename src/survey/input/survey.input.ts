import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class inputSurvey {
  @Field() readonly title: string;
  @Field() readonly finish: string;
}
