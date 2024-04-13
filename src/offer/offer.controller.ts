import { Body, Controller, Logger, Post } from '@nestjs/common';
import { OfferService } from './offer.service';
import { KafkaPayloadDto } from '../providers/kafka/typedefs';
import { RestPayloadDto } from '../providers/rest/typedefs';

@Controller('offer')
export class OfferController {
  private readonly logger = new Logger(OfferController.name);

  constructor(private readonly service: OfferService) {}
  @Post('identify')
  identifyProvider(@Body() body: any): string {
    this.logger.log('[identify provider:]', body);
    return this.service.identifyProvider(body);
  }

  @Post('parse/kafka')
  parseKafka(@Body() body: KafkaPayloadDto): string {
    this.logger.log('[parsing kafka offers:]', body);
    return this.service.parseKafka(body);
  }

  @Post('parse/rest')
  parseRest(@Body() body: RestPayloadDto): string {
    this.logger.log('[parsing rest offers:]', body);
    return this.service.parseRest(body);
  }
}
