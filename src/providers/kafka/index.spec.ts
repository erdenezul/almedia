import { KafkaProvider } from '.';
import {
  KafkaOfferPayloadDtoRecordFactory,
  KafkaPayloadRecordFactory,
} from '../../offer/__mocks__/kafka';
import { payload } from '../../offer/data/offer1.payload';
import { Platform } from './typedefs';

describe('KafkaProvider', () => {
  let provider: KafkaProvider;

  beforeEach(() => {
    provider = new KafkaProvider();
  });

  describe('parse offer', () => {
    it('should parse example offer', () => {
      // using any here because I didn't type all the fields
      const result = provider.parseOffer(payload as any);
      expect(result[0]).toStrictEqual({
        name: payload.response.offers[0].offer_name,
        description: payload.response.offers[0].offer_desc,
        externalOfferId: payload.response.offers[0].offer_id,
        requirements: payload.response.offers[0].call_to_action,
        offerUrlTemplate: payload.response.offers[0].offer_url,
        providerName: 'kafka',
        thumbnail: payload.response.offers[0].image_url,
        slug: '@todo',
        isIos: 1,
        isDesktop: 0,
        isAndroid: 0,
      });
    });

    it('should parse platform information', () => {
      const payload = KafkaPayloadRecordFactory.getSingleRecord({});
      const [first, ...rest] = provider.parseOffer(payload);
      expect(rest).toBeDefined();
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
