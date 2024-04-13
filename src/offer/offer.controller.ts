import { Body, Controller, Logger, Post } from '@nestjs/common';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  private readonly logger = new Logger(OfferController.name);

  constructor(private readonly service: OfferService) {}
  @Post('identify')
  identifyProvider(@Body() body: any): string {
    this.logger.log('[Post: identify provider:]', body);
    return this.service.identifyProvider(body);
  }
}
