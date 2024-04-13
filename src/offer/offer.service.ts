import { Injectable } from '@nestjs/common';
import { KafkaProvider } from '../providers/kafka';
import { RestProvider } from '../providers/rest';

@Injectable()
export class OfferService {
  identifyProvider(data: any): string {
    if (data.query?.pubid && data.response) {
      return KafkaProvider.name;
    }
    if (data?.status && data?.data) {
      return RestProvider.name;
    }

    return 'unknown';
  }
}
