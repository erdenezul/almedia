import { Module } from '@nestjs/common';
import { OfferController } from './offer/offer.controller';

@Module({
  imports: [],
  controllers: [OfferController],
  providers: [],
})
export class AppModule {}
