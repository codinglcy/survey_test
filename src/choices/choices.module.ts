import { Module } from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { ChoicesResolver } from './choices.resolver';

@Module({
  providers: [ChoicesService, ChoicesResolver]
})
export class ChoicesModule {}
