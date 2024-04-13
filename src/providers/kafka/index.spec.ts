import {
  KafkaOfferPayloadDtoRecordFactory,
  KafkaPayloadRecordFactory,
} from '../../offer/__mocks__/kafka';
import { KafkaProvider } from '.';
import { Platform } from './typedefs';

describe('KafkaProvider', () => {
  let provider: KafkaProvider;

  beforeEach(() => {
    provider = new KafkaProvider();
  });

  describe('parse offer', () => {
    it('should parse platform information', () => {
      const payload = KafkaPayloadRecordFactory.getSingleRecord({});
      const [first, ...rest] = provider.parseOffer(payload);
      expect(first.isIos).toBe(1);
      expect(first.isDesktop).toBe(0);
      expect(first.isAndroid).toBe(0);
    });

    it('should parse isDesktop as true', () => {
      const offer = KafkaOfferPayloadDtoRecordFactory.getSingleRecord({
        platform: Platform.desktop,
        device: 'windows',
      });
      const payload = KafkaPayloadRecordFactory.getSingleRecord({
        response: { offers_count: 1, currency_name: 'USD', offers: [offer] },
      });
      const result = provider.parseOffer(payload);
      expect(result[0].isDesktop).toBe(1);
    });

    it('should parse isAndroid as true', () => {
      const offer = KafkaOfferPayloadDtoRecordFactory.getSingleRecord({
        platform: Platform.mobile,
        device: 'nexus',
      });
      const payload = KafkaPayloadRecordFactory.getSingleRecord({
        response: { offers_count: 1, currency_name: 'USD', offers: [offer] },
      });
      const result = provider.parseOffer(payload);
      expect(result[0].isAndroid).toBe(1);
    });
  });
});
