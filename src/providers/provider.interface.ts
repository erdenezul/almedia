import { Offer } from 'src/offer/offer.entity';

export interface OfferProvider {
  /**
   * Parse payload into offer without id
   * @note id will be auto generated in database (undeterministic)
   */
  parseOffer: (value) => Omit<Offer, 'id'>[];
}
