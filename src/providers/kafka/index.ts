import { Injectable } from '@nestjs/common';
import { OfferProvider } from '../provider.interface';
import { Offer } from 'src/offer/offer.entity';
import { KafkaOfferPayloadDto, KafkaPayload, Platform } from './typedefs';

@Injectable()
export class KafkaProvider implements OfferProvider {
  /**
   * @returns Offer list without id
   */
  parseOffer({ response }: KafkaPayload): Omit<Offer, 'id'>[] {
    return response.offers.map((offer) => this.extractOffer(offer));
  }

  /**
   * @param device {iphone_ipad should be considered as android}
   */
  private extractOffer({
    offer_id: externalOfferId,
    offer_name: name,
    preview_url: thumbnail,
    offer_desc: description,
    call_to_action: requirements,
    device,
    platform,
    offer_url_easy: slug,
  }: KafkaOfferPayloadDto): Omit<Offer, 'id'> {
    return {
      name,
      description,
      thumbnail,
      requirements,
      // all should be considered as android except iphone_ipad
      isAndroid:
        platform === Platform.mobile && device !== 'iphone_ipad' ? 1 : 0,
      isDesktop: platform === Platform.desktop ? 1 : 0,
      slug,
      isIos: platform === Platform.mobile && device === 'iphone_ipad' ? 1 : 0,
      externalOfferId,
      providerName: 'todo',
      offerUrlTemplate: 'todo',
    };
  }
}
