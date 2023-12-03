import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuestionEntity } from './questions.entity';
import { QuestionsService } from './questions.service';
import {
  QuestionDto,
  deleteQuestionResult,
  inputQuestion,
  updateQuestion,
} from './questions.types';

@Resolver(QuestionEntity)
export class QuestionsResolver {
  constructor(private readonly questionService: QuestionsService) {}

  @Query(() => [QuestionDto])
  async getAllQuestion() {
    return this.questionService.getQuestions();
  }

  @Query(() => QuestionDto)
  async getQuestionById(@Args('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @Mutation(() => QuestionDto)
  async createQuestion(@Args('data') data: inputQuestion) {
    return this.questionService.createQuestion(data);
  }

  @Mutation(() => QuestionDto)
  async updateQuestion(@Args('data') data: updateQuestion) {
    return this.questionService.updateQuestionById(data);
  }

  @Mutation(() => deleteQuestionResult)
  async deleteQuestion(@Args('id') id: string) {
    return this.questionService.deleteQuestionById(id);
  }
}
