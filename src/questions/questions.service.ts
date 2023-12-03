import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  deleteQuestionResult,
  inputQuestion,
  updateQuestion,
} from './questions.types';
import { QuestionEntity } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly QuestionRepository: Repository<QuestionEntity>,
  ) {}

  async createQuestion(data: inputQuestion): Promise<QuestionEntity> {
    let question = new QuestionEntity();
    question.qnum = data.qnum;
    question.detail = data.detail;
    question.multi = data.multi;
    question.surveyId = data.surveyId;

    await this.QuestionRepository.save(question);

    return question;
  }

  async getQuestions(): Promise<QuestionEntity[]> {
    return await this.QuestionRepository.find({
      relations: {
        choices: true,
      },
    });
  }

  async getQuestionById(id: string): Promise<QuestionEntity> {
    return await this.QuestionRepository.findOne({
      relations: { choices: true },
      where: { id: id },
    });
  }

  async updateQuestionById(data: updateQuestion): Promise<QuestionEntity> {
    let result = await this.QuestionRepository.update(data.id, data);

    if (result.affected === 1) {
      return this.QuestionRepository.findOne({
        where: { id: data.id },
        relations: { choices: true },
      });
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
