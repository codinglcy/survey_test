import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { inputSurvey } from './input/survey.input';

@Resolver('SurveyEntity')
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => [CreateSurveyDto])
  async survey() {
    return this.surveyService.getSurvey();
  }

  @Mutation(() => CreateSurveyDto)
  async createSurvey(@Args('data') data: inputSurvey) {
    return this.surveyService.createSurvey(data);
  }
}
