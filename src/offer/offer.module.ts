import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { RestProvider, KafkaProvider } from '@almedia/providers';
import { OfferController } from './offer.controller';

@Module({
  providers: [OfferService, KafkaProvider, RestProvider],
  controllers: [OfferController],
})
export class OfferModule {}
