import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';

@Module({
  providers: [QuestionsService, QuestionsResolver]
})
export class QuestionsModule {}
