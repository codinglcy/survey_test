import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import { AnswerEntity } from './answers.entity';
import {
  AnswerDto,
  deleteAnswerResult,
  inputAnswer,
  updateAnswer,
} from './answers.types';

@Resolver(AnswerEntity)
export class AnswersResolver {
  constructor(private readonly answerService: AnswersService) {}

  @Query(() => [AnswerDto])
  async getAllAnswer() {
    return this.answerService.getAnswers();
  }

  @Query(() => AnswerDto)
  async getAnswerById(@Args('id') id: string) {
    return this.answerService.getAnswerById(id);
  }

  @Mutation(() => AnswerDto)
  async createAnswer(@Args('data') data: inputAnswer) {
    return this.answerService.createAnswer(data);
  }

  @Mutation(() => AnswerDto)
  async updateAnswer(@Args('data') data: updateAnswer) {
    return this.answerService.updateAnswerById(data);
  }

  @Mutation(() => deleteAnswerResult)
  async deleteAnswer(@Args('id') id: string) {
    return this.answerService.deleteAnswerById(id);
  }
}
