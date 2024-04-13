import { RestProvider } from '.';
import { RestPayloadDtoRecordFactory } from '../../offer/__mocks__/rest';
import { payload } from '../../offer/data/offer2.payload';

describe('RestProvider', () => {
  let provider: RestProvider;

  beforeEach(() => {
    provider = new RestProvider();
  });

  it('should parse example offer', () => {
    // using any here because I didn't declare other fields in type
    const result = provider.parseOffer(payload as any);
    expect(result[0]).toStrictEqual({
      name: 'Sofi',
      isIos: 1,
      isAndroid: 0,
      isDesktop: 1,
      thumbnail: 'https://some.url',
      offerUrlTemplate: 'https://some.url',
      providerName: 'rest',
      externalOfferId: 15828,
      slug: '@todo',
      description:
        'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
      requirements:
        'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
    });
  });
  it('should return multiple offers', () => {
    const payload = RestPayloadDtoRecordFactory.getSingleRecord();

    const result = provider.parseOffer(payload);
    expect(result.length).toBe(2);
  });
});
