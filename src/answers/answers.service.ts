import { Injectable } from '@nestjs/common';
import { AnswerEntity } from './answers.entity';
import { Repository } from 'typeorm';
import { deleteAnswerResult, inputAnswer, updateAnswer } from './answers.types';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceEntity } from 'src/choices/choices.entity';
import { ErrorDto } from 'src/error.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  async createAnswer(data: inputAnswer): Promise<ErrorDto | AnswerEntity> {
    let answer = new AnswerEntity();
    answer.surveyId = data.surveyId;
    answer.questionId = data.questionId;
    answer.choiceId = data.choiceId;
    answer.user = data.user;

    return await this.answerRepository
      .save(answer)
      .then(() => {
        return answer;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'SAVE_ERROR' };
      });
  }

  async getAnswers(): Promise<ErrorDto | AnswerEntity[]> {
    return await this.answerRepository
      .find()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async getAnswerById(id: string): Promise<ErrorDto | AnswerEntity> {
    return await this.answerRepository
      .findOneBy({ id: id })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async getSurveyAnswersByUser(
    surveyId: string,
    user: string,
  ): Promise<ErrorDto | AnswerEntity[]> {
    return await this.answerRepository
      .findBy({
        surveyId: surveyId,
        user: user,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async getSurveyScore(surveyId: string): Promise<ErrorDto | number> {
    return await this.answerRepository
      .findBy({ surveyId: surveyId })
      .then((res) => {
        return res
          .map((answer: AnswerEntity) => answer.choice)
          .map((choice: ChoiceEntity) => choice.score)
          .reduce((result: number, value: number) => result + value, 0);
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async getSurveyScoreByUser(
    surveyId: string,
    user: string,
  ): Promise<ErrorDto | number> {
    return await this.answerRepository
      .findBy({ surveyId: surveyId, user: user })
      .then((res) => {
        return res
          .map((answer: AnswerEntity) => answer.choice)
          .map((choice: ChoiceEntity) => choice.score)
          .reduce((result: number, value: number) => result + value, 0);
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async updateAnswerById(data: updateAnswer): Promise<ErrorDto | AnswerEntity> {
    let result = await this.answerRepository
      .update(data.id, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { affected: 0 };
      });

    if (result.affected === 1) {
      return this.answerRepository
        .findOneBy({ id: data.id })
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

  async deleteAnswerById(id: string): Promise<deleteAnswerResult> {
    let returnDeleteResult = new deleteAnswerResult();

    let result = await this.answerRepository.delete(id);
    returnDeleteResult.result =
      result.affected === 1
        ? '답변 [' + id + '] 를 삭제했습니다.'
        : '답변 삭제에 실패했습니다.';

    return returnDeleteResult;
  }
}
