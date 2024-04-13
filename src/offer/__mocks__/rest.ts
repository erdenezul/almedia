import {
  RestOfferPayloadDto,
  RestPayloadDto,
} from 'src/providers/rest/typedefs';
import { faker } from '@faker-js/faker';
import { InstanceFactory } from '.';
export const RestOfferPayloadDtoRecordFactory =
  new InstanceFactory<RestOfferPayloadDto>(
    (): RestOfferPayloadDto => ({
      campaign_id: faker.string.uuid(),
      name: faker.internet.userName(),
      description: faker.person.bio(),
      icon: faker.image.avatar(),
      tracking_url: faker.internet.url(),
      instructions: faker.string.alphanumeric(10),
    }),
  );

export const RestPayloadDtoRecordFactory = new InstanceFactory<RestPayloadDto>(
  (): RestPayloadDto => ({
    status: 'success',
    data: {
      [faker.string.uuid()]: {
        Offer: RestOfferPayloadDtoRecordFactory.getSingleRecord(),
        OS: {
          android: true,
          ios: false,
          web: true,
        },
      },
      [faker.string.uuid()]: {
        Offer: RestOfferPayloadDtoRecordFactory.getSingleRecord(),
        OS: {
          android: true,
          ios: false,
          web: true,
        },
      },
    },
  }),
);
