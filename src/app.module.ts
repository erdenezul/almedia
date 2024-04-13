import { Module } from '@nestjs/common';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [OfferModule],
})
export class AppModule {}
