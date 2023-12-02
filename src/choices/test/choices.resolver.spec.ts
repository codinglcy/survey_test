import { Test, TestingModule } from '@nestjs/testing';
import { ChoicesResolver } from '../choices.resolver';

describe('ChoicesResolver', () => {
  let resolver: ChoicesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChoicesResolver],
    }).compile();

    resolver = module.get<ChoicesResolver>(ChoicesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
