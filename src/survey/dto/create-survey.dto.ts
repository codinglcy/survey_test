import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateSurveyDto {
  @Field() readonly id?: string;
  @Field() readonly title!: string;
  @Field() readonly finish: string;
}
