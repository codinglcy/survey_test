import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from './surveys.entity';
import { Repository } from 'typeorm';
import { deleteSurveyResult, inputSurvey, updateSurvey } from './surveys.types';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly SurveyRepository: Repository<SurveyEntity>,
  ) {}

  async createSurvey(data: inputSurvey): Promise<SurveyEntity> {
    let survey = new SurveyEntity();
    survey.title = data.title;
    survey.notification = data.notification;
    survey.finish = data.finish;

    await this.SurveyRepository.save(survey);

    return survey;
  }

  async getSurveys(): Promise<SurveyEntity[]> {
    return await this.SurveyRepository.find({
      relations: ['questions'],
    });
  }

  async getSurveyById(id: string): Promise<SurveyEntity> {
    return await this.SurveyRepository.findOne({
      relations: { questions: true },
      where: { id: id },
    });
  }

  async updateSurveyById(data: updateSurvey): Promise<SurveyEntity> {
    let result = await this.SurveyRepository.update(data.id, data);

    if (result.affected === 1) {
      return this.SurveyRepository.findOne({
        where: { id: data.id },
        relations: { questions: true },
      });
    }
  }

  async deleteSurveyById(id: string): Promise<deleteSurveyResult> {
    let returnDeleteResult = new deleteSurveyResult();

    let result = await this.SurveyRepository.delete(id);
    returnDeleteResult.result =
      result.affected === 1
        ? '설문지 [' + id + '] 를 삭제했습니다.'
        : '설문지 삭제에 실패했습니다.';

    return returnDeleteResult;
  }
}
