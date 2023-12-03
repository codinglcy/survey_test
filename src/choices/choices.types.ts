import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AnswerEntity } from 'src/answers/answers.entity';

@ObjectType()
class ChoiceDto {
  @Field() readonly id?: string;
  @Field() readonly cnum: number;
  @Field() readonly content: string;
  @Field() readonly questionId: string;
  // @Field(() => [AnswerEntity], { nullable: true })
  // readonly answers: AnswerEntity[];
}

@InputType()
class inputChoice {
  @Field() readonly cnum: number;
  @Field() readonly content: string;
  @Field() readonly questionId: string;
}

@InputType()
class updateChoice {
  @Field() readonly id?: string;
  @Field() readonly cnum: number;
  @Field() readonly content: string;
  @Field() readonly questionId: string;
}

@ObjectType()
class deleteChoiceResult {
  @Field() result: string;
}

export { ChoiceDto, inputChoice, updateChoice, deleteChoiceResult };
