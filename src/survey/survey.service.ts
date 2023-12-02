import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from './survey.entity';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly SurveyRepository: Repository<SurveyEntity>,
  ) {}

  async createSurvey(data: CreateSurveyDto) {
    let survey = new SurveyEntity();
    survey.title = data.title;
    survey.finish = data.finish;

    await this.SurveyRepository.save(survey);
  }

  async getSurvey() {
    return await this.SurveyRepository.find();
  }
}
