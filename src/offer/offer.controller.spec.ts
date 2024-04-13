import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import { payload as kafkaPayload } from './data/offer1.payload';
import { OfferService } from './offer.service';
import { payload as restPayload } from './data/offer2.payload';

describe('OfferController', () => {
  let controller: OfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferController],
      providers: [OfferService],
    }).compile();

    controller = module.get<OfferController>(OfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('identify provider', () => {
    it('should identify kafka as provider', () => {
      const result = controller.identifyProvider(kafkaPayload);
      expect(result).toBe('KafkaProvider');
    });

    it('should identify rest as provider', () => {
      expect(controller.identifyProvider(restPayload)).toBe('RestProvider');
    });

    it('should fail to identify', () => {
      expect(controller.identifyProvider({})).toBe('unknown');
    });
  });
});
