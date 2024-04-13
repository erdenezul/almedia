import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from './offer.service';
import { KafkaProvider, RestProvider } from '@almedia/providers';

describe('OfferService', () => {
  let service: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferService, KafkaProvider, RestProvider],
    }).compile();

    service = module.get<OfferService>(OfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
