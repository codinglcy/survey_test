import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from './surveys.entity';
import { Repository } from 'typeorm';
import { deleteSurveyResult, inputSurvey, updateSurvey } from './surveys.types';
import { ErrorDto } from 'src/error.dto';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly SurveyRepository: Repository<SurveyEntity>,
  ) {}

  async createSurvey(data: inputSurvey): Promise<ErrorDto | SurveyEntity> {
    let survey = new SurveyEntity();
    survey.title = data.title;
    survey.notification = data.notification;
    survey.finish = data.finish;

    return await this.SurveyRepository.save(survey)
      .then(() => {
        return survey;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'SAVE_ERROR' };
      });
  }

  async getSurveys(): Promise<ErrorDto | SurveyEntity[]> {
    return await this.SurveyRepository.find({
      relations: ['questions'],
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async getSurveyById(id: string): Promise<ErrorDto | SurveyEntity> {
    return await this.SurveyRepository.findOne({
      relations: { questions: true },
      where: { id: id },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async updateSurveyById(data: updateSurvey): Promise<ErrorDto | SurveyEntity> {
    let result = await this.SurveyRepository.update(data.id, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { affected: 0 };
      });

    if (result.affected === 1) {
      return this.SurveyRepository.findOne({
        where: { id: data.id },
        relations: { questions: true },
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return { message: err, code: 'FIND_ERROR' };
        });
    } else {
      return { message: 'nothing to update', code: 'UPDATE_ERROR' };
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
