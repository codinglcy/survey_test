import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceEntity } from './choices.entity';
import { Repository } from 'typeorm';
import { deleteChoiceResult, inputChoice, updateChoice } from './choices.types';

@Injectable()
export class ChoicesService {
  constructor(
    @InjectRepository(ChoiceEntity)
    private readonly ChoiceRepository: Repository<ChoiceEntity>,
  ) {}

  async createChoice(data: inputChoice): Promise<ChoiceEntity> {
    let choice = new ChoiceEntity();
    choice.cnum = data.cnum;
    choice.content = data.content;
    choice.questionId = data.questionId;

    await this.ChoiceRepository.save(choice);

    return choice;
  }

  async getChoices(): Promise<ChoiceEntity[]> {
    return await this.ChoiceRepository.find();
  }

  async getChoiceById(id: string): Promise<ChoiceEntity> {
    return await this.ChoiceRepository.findOneBy({ id: id });
  }

  async updateChoiceById(data: updateChoice): Promise<ChoiceEntity> {
    let result = await this.ChoiceRepository.update(data.id, data);

    if (result.affected === 1) {
      return this.ChoiceRepository.findOneBy({ id: data.id });
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
