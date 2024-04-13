import { KafkaProvider, RestProvider } from '@almedia/providers';
import { Test, TestingModule } from '@nestjs/testing';
import { KafkaPayloadRecordFactory } from './__mocks__/kafka';
import { RestPayloadDtoRecordFactory } from './__mocks__/rest';
import { payload as kafkaPayload } from './data/offer1.payload';
import { payload as restPayload } from './data/offer2.payload';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';

describe('OfferController', () => {
  let controller: OfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferController],
      providers: [OfferService, KafkaProvider, RestProvider],
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

  describe('parse kafka', () => {
    const payload = KafkaPayloadRecordFactory.getSingleRecord();

    it('should return ok', () => {
      const result = controller.parseKafka(payload);
      expect(result).toBe('ok');
    });
  });

  describe('parse rest', () => {
    const payload = RestPayloadDtoRecordFactory.getSingleRecord();

    it('should return ok', () => {
      expect(controller.parseRest(payload)).toBe('ok');
    });
  });
});
