import { Injectable, Logger } from '@nestjs/common';
import { Offer } from '../../offer/offer.entity';
import { OfferProvider } from '../provider.interface';
import { KafkaOfferPayloadDto, KafkaPayloadDto, Platform } from './typedefs';

@Injectable()
export class KafkaProvider implements OfferProvider {
  private readonly logger = new Logger(KafkaProvider.name);

  /**
   * @returns Offer list without id
   */
  parseOffer(payload: KafkaPayloadDto): Omit<Offer, 'id'>[] {
    this.logger.log('[parsing offers:]', payload);
    try {
      return payload.response.offers.map((offer) => this.extractOffer(offer));
    } catch (error) {
      this.logger.warn('[failed to parse offers:]', payload);
      this.logger.warn('[Put this payload in dead letter queue:]', payload);
    }
    return [];
  }

  /**
   * @param device {iphone_ipad should be considered as android}
   * @todo clarify which field considered as a slug
   */
  private extractOffer(payload: KafkaOfferPayloadDto): Omit<Offer, 'id'> {
    this.logger.log('[Kafka provider: parse offer:]', payload);

    const {
      offer_id: externalOfferId,
      offer_name: name,
      image_url: thumbnail,
      offer_desc: description,
      call_to_action: requirements,
      device,
      platform,
      offer_url: offerUrlTemplate,
    } = payload;

    return {
      name,
      description,
      thumbnail,
      requirements,
      // all should be considered as android except iphone_ipad
      isAndroid:
        platform === Platform.mobile && device !== 'iphone_ipad' ? 1 : 0,
      isDesktop: platform === Platform.desktop ? 1 : 0,
      // @todo: clarify which fields should be considered as slug
      slug: '@todo',
      isIos: platform === Platform.mobile && device === 'iphone_ipad' ? 1 : 0,
      externalOfferId,
      providerName: 'kafka',
      offerUrlTemplate,
    };
  }
}

export * from './typedefs';
