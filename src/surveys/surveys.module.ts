import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysResolver } from './surveys.resolver';

@Module({
  providers: [SurveysService, SurveysResolver]
})
export class SurveysModule {}
