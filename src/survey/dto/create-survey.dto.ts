import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateSurveyDto {
  @Field() readonly id?: string;
  @Field() readonly title!: string;
  @Field({ nullable: true }) readonly finish?: string;
}
