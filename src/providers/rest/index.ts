import { Injectable } from '@nestjs/common';
import { OfferProvider } from '../provider.interface';
import { Offer } from 'src/offer/offer.entity';
import { OsInfo, RestOfferPayloadDto, RestPayloadDto } from './typedefs';

@Injectable()
export class RestProvider implements OfferProvider {
  parseOffer(value: RestPayloadDto): Omit<Offer, 'id'>[] {
    return Object.values(value.data).map((row) =>
      this.extractOffer(row.Offer, row.OS),
    );
  }

  private extractOffer(
    {
      campaign_id: externalOfferId,
      name,
      description,
      instructions: requirements,
      tracking_url: offerUrlTemplate,
      icon: thumbnail,
    }: RestOfferPayloadDto,
    os: OsInfo,
  ): Omit<Offer, 'id'> {
    return {
      externalOfferId,
      providerName: 'rest',
      name,
      description,
      requirements,
      thumbnail,
      offerUrlTemplate,
      isAndroid: Number(os.android),
      isIos: Number(os.ios),
      isDesktop: Number(os.web),
      // @todo: clarify where should I get?
      slug: '@todo',
    };
  }
}
