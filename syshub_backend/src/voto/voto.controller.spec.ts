import { Test, TestingModule } from '@nestjs/testing';
import { VotoController } from './voto.controller';
import { VotoService } from './voto.service';

describe('VotoController', () => {
  let controller: VotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotoController],
      providers: [VotoService],
    }).compile();

    controller = module.get<VotoController>(VotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
