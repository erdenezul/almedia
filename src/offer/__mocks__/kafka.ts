import { InstanceFactory } from '.';
import {
  KafkaOfferPayloadDto,
  KafkaPayload,
  Platform,
} from '../../providers/kafka/typedefs';
import { faker } from '@faker-js/faker';


export const KafkaOfferPayloadDtoRecordFactory =
  new InstanceFactory<KafkaOfferPayloadDto>(
    (): KafkaOfferPayloadDto => ({
      offer_desc: faker.person.bio(),

      disclaimer: faker.string.alpha(),
      offer_url: faker.internet.url(),
      offer_url_easy: faker.internet.url(),
      offer_id: faker.string.uuid(),
      offer_name: faker.internet.userName(),
      image_url: faker.internet.url(),
      image_url_220x124: faker.internet.url(),
      countries: [faker.location.countryCode()],
      call_to_action: faker.string.alphanumeric(10),
      platform: Platform.mobile,
      device: 'iphone_ipad',
      preview_url: faker.image.avatar(),
      package_id: faker.string.uuid(),
      verticals: [],
    }),
  );

export const KafkaPayloadRecordFactory = new InstanceFactory<KafkaPayload>(
  (): KafkaPayload => ({
    query: {
      appid: faker.number.int(),
      country: faker.location.countryCode(),
      platform: faker.string.alpha(),
      pubid: faker.string.uuid(),
    },
    response: {
      currency_name: 'Coins',
      offers_count: faker.number.int(),
      offers: KafkaOfferPayloadDtoRecordFactory.getArray(1),
    },
  }),
);
