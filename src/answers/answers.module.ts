import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  providers: [AnswersService, AnswersResolver],
})
export class AnswersModule {}
