import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChoiceEntity } from './choices.entity';
import {
  ChoiceDto,
  deleteChoiceResult,
  inputChoice,
  updateChoice,
} from './choices.types';
import { ChoicesService } from './choices.service';

@Resolver(ChoiceEntity)
export class ChoicesResolver {
  constructor(private readonly choiceService: ChoicesService) {}

  @Query(() => [ChoiceDto])
  async getAllChoice() {
    return this.choiceService.getChoices();
  }

  @Query(() => ChoiceDto)
  async getChoiceById(@Args('id') id: string) {
    return this.choiceService.getChoiceById(id);
  }

  @Mutation(() => ChoiceDto)
  async createChoice(@Args('data') data: inputChoice) {
    return this.choiceService.createChoice(data);
  }

  @Mutation(() => ChoiceDto)
  async updateChoice(@Args('data') data: updateChoice) {
    return this.choiceService.updateChoiceById(data);
  }

  @Mutation(() => deleteChoiceResult)
  async deleteChoice(@Args('id') id: string) {
    return this.choiceService.deleteChoiceById(id);
  }
}
