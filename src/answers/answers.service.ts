import { Injectable } from '@nestjs/common';
import { AnswerEntity } from './answers.entity';
import { Repository } from 'typeorm';
import { deleteAnswerResult, inputAnswer, updateAnswer } from './answers.types';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceEntity } from 'src/choices/choices.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  async createAnswer(data: inputAnswer): Promise<AnswerEntity> {
    let answer = new AnswerEntity();
    answer.surveyId = data.surveyId;
    answer.questionId = data.questionId;
    answer.choiceId = data.choiceId;
    answer.user = data.user;

    await this.answerRepository.save(answer);

    return answer;
  }

  async getAnswers(): Promise<AnswerEntity[]> {
    return await this.answerRepository.find();
  }

  async getAnswerById(id: string): Promise<AnswerEntity> {
    return await this.answerRepository.findOneBy({ id: id });
  }

  async getSurveyAnswersByUser(
    surveyId: string,
    user: string,
  ): Promise<AnswerEntity[]> {
    return await this.answerRepository.findBy({
      surveyId: surveyId,
      user: user,
    });
  }

  async getSurveyScore(surveyId: string): Promise<number> {
    let scoreResult = (
      await this.answerRepository.findBy({ surveyId: surveyId })
    )
      .map((answer: AnswerEntity) => answer.choice)
      .map((choice: ChoiceEntity) => choice.score)
      .reduce((result: number, value: number) => result + value, 0);

    return scoreResult;
  }

  async getSurveyScoreByUser(surveyId: string, user: string): Promise<number> {
    let scoreResult = (
      await this.answerRepository.findBy({ surveyId: surveyId, user: user })
    )
      .map((answer: AnswerEntity) => answer.choice)
      .map((choice: ChoiceEntity) => choice.score)
      .reduce((result: number, value: number) => result + value, 0);

    return scoreResult;
  }

  async updateAnswerById(data: updateAnswer): Promise<AnswerEntity> {
    let result = await this.answerRepository.update(data.id, data);

    if (result.affected === 1) {
      return this.answerRepository.findOneBy({ id: data.id });
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
