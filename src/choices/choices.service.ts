import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceEntity } from './choices.entity';
import { Repository } from 'typeorm';
import { deleteChoiceResult, inputChoice, updateChoice } from './choices.types';
import { ErrorDto } from 'src/error.dto';

@Injectable()
export class ChoicesService {
  constructor(
    @InjectRepository(ChoiceEntity)
    private readonly ChoiceRepository: Repository<ChoiceEntity>,
  ) {}

  async createChoice(data: inputChoice): Promise<ErrorDto | ChoiceEntity> {
    let choice = new ChoiceEntity();
    choice.cnum = data.cnum;
    choice.content = data.content;
    choice.score = data.score;
    choice.questionId = data.questionId;

    return await this.ChoiceRepository.save(choice)
      .then(() => {
        return choice;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'SAVE_ERROR' };
      });
  }

  async getChoices(): Promise<ErrorDto | ChoiceEntity[]> {
    return await this.ChoiceRepository.find()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async getChoiceById(id: string): Promise<ErrorDto | ChoiceEntity> {
    return await this.ChoiceRepository.findOneBy({ id: id })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { message: err, code: 'FIND_ERROR' };
      });
  }

  async updateChoiceById(data: updateChoice): Promise<ErrorDto | ChoiceEntity> {
    let result = await this.ChoiceRepository.update(data.id, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return { affected: 0 };
      });

    if (result.affected === 1) {
      return this.ChoiceRepository.findOneBy({ id: data.id })
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

  async deleteChoiceById(id: string): Promise<deleteChoiceResult> {
    let returnDeleteResult = new deleteChoiceResult();

    let result = await this.ChoiceRepository.delete(id);
    returnDeleteResult.result =
      result.affected === 1
        ? '선택지 [' + id + '] 를 삭제했습니다.'
        : '선택지 삭제에 실패했습니다.';

    return returnDeleteResult;
  }
}
