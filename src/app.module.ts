import { Module } from '@nestjs/common';
import { OfferController } from './offer/offer.controller';
import { OfferService } from './offer/offer.service';

@Module({
  imports: [],
  controllers: [OfferController],
  providers: [OfferService],
})
export class AppModule {}
