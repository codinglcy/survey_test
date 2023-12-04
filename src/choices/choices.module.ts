import { Module } from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { ChoicesResolver } from './choices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceEntity } from './choices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChoiceEntity])],
  providers: [ChoicesService, ChoicesResolver],
})
export class ChoicesModule {}
