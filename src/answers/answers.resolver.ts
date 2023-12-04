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

  @Query(() => [AnswerDto])
  async getSurveyAnswersByUser(
    @Args('surveyId') surveyId: string,
    @Args('user') user: string,
  ) {
    return this.answerService.getSurveyAnswersByUser(surveyId, user);
  }

  @Query(() => Number)
  async getSurveyScore(@Args('surveyId') surveyId: string) {
    return this.answerService.getSurveyScore(surveyId);
  }

  @Query(() => Number)
  async getSurveyScoreByUser(
    @Args('surveyId') surveyId: string,
    @Args('user') user: string,
  ) {
    return this.answerService.getSurveyScoreByUser(surveyId, user);
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
