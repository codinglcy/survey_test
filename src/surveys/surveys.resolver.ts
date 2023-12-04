import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SurveyEntity } from './surveys.entity';
import { SurveysService } from './surveys.service';
import {
  SurveyDto,
  deleteSurveyResult,
  inputSurvey,
  updateSurvey,
} from './surveys.types';

@Resolver(SurveyEntity)
export class SurveysResolver {
  constructor(private readonly surveyService: SurveysService) {}

  @Query(() => [SurveyDto])
  async getAllSurvey() {
    return this.surveyService.getSurveys();
  }

  @Query(() => SurveyDto)
  async getSurveyById(@Args('id') id: string) {
    return this.surveyService.getSurveyById(id);
  }

  @Mutation(() => SurveyDto)
  async createSurvey(@Args('data') data: inputSurvey) {
    return this.surveyService.createSurvey(data);
  }

  @Mutation(() => SurveyDto)
  async updateSurvey(@Args('data') data: updateSurvey) {
    return this.surveyService.updateSurveyById(data);
  }

  @Mutation(() => deleteSurveyResult)
  async deleteSurvey(@Args('id') id: string) {
    return this.surveyService.deleteSurveyById(id);
  }
}
