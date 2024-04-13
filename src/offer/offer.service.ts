import { Injectable } from '@nestjs/common';
import {
  KafkaProvider,
  KafkaPayloadDto,
  RestProvider,
  RestPayloadDto,
} from '@almedia/providers';

@Injectable()
export class OfferService {
  constructor(
    private readonly kafkaProvider: KafkaProvider,
    private readonly restProvider: RestProvider,
  ) {}

  identifyProvider(data: any): string {
    if (data.query?.pubid && data.response) {
      return KafkaProvider.name;
    }
    if (data?.status && data?.data) {
      return RestProvider.name;
    }

    return 'unknown';
  }

  parseKafka(payload: KafkaPayloadDto): string {
    this.kafkaProvider.parseOffer(payload);
    return 'ok';
  }

  parseRest(payload: RestPayloadDto): string {
    this.restProvider.parseOffer(payload);
    return 'ok';
  }
}
