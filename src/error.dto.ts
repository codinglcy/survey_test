import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorDto {
  @Field() message: string;
  @Field() code: string | unknown;
}
