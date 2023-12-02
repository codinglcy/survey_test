import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class inputSurvey {
  @Field() readonly title!: string;
  @Field({ nullable: true }) readonly finish: string;
}
