import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysResolver } from './surveys.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from './surveys.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity])],
  providers: [SurveysService, SurveysResolver],
})
export class SurveysModule {}
