import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  deleteQuestionResult,
  inputQuestion,
  updateQuestion,
} from './questions.types';
import { QuestionEntity } from './questions.entity';
import { ErrorDto } from 'src/error.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly QuestionRepository: Repository<QuestionEntity>,
  ) {}

  async createQuestion(
    data: inputQuestion,
  ): Promise<ErrorDto | QuestionEntity> {
    let question = new QuestionEntity();
    question.qnum = data.qnum;
    question.detail = data.detail;
    question.multi = data.multi;
    question.surveyId = data.surveyId;

    return await this.QuestionRepository.save(question)
      .then(() => {
        return question;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'SAVE_ERROR' };
      });
  }

  async getQuestions(): Promise<ErrorDto | QuestionEntity[]> {
    return await this.QuestionRepository.find({
      relations: {
        choices: true,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async getQuestionById(id: string): Promise<ErrorDto | QuestionEntity> {
    return await this.QuestionRepository.findOne({
      relations: { choices: true },
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

  async updateQuestionById(
    data: updateQuestion,
  ): Promise<ErrorDto | QuestionEntity> {
    let result = await this.QuestionRepository.update(data.id, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { affected: 0 };
      });

    if (result.affected === 1) {
      return this.QuestionRepository.findOne({
        where: { id: data.id },
        relations: { choices: true },
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

  async deleteQuestionById(id: string): Promise<deleteQuestionResult> {
    let returnDeleteResult = new deleteQuestionResult();

    let result = await this.QuestionRepository.delete(id);
    returnDeleteResult.result =
      result.affected === 1
        ? '문항 [' + id + '] 를 삭제했습니다.'
        : '문항 삭제에 실패했습니다.';

    return returnDeleteResult;
  }
}
