import { Test, TestingModule } from '@nestjs/testing';
import { GoodsImagesService } from './goods-images.service';

describe('GoodsImagesService', () => {
  let service: GoodsImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodsImagesService],
    }).compile();

    service = module.get<GoodsImagesService>(GoodsImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
