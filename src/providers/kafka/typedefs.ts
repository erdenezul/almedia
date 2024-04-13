import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsString, IsUrl } from 'class-validator';

export class KafkaVerticalDTO {
  @IsString()
  vertical_id: string;

  @IsString()
  vertical_name: string;
}

export enum Platform {
  desktop = 'desktop',
  mobile = 'mobile',
}
export class KafkaOfferPayloadDto {
  @IsString()
  offer_id: string;

  @IsString()
  offer_name: string;

  @IsString()
  offer_desc: string;

  @IsString()
  call_to_action: string;

  @IsString()
  disclaimer: string;

  @IsUrl()
  offer_url: string;

  @IsUrl()
  offer_url_easy: string;

  @IsUrl()
  image_url: string;

  @IsUrl()
  image_url_220x124: string;

  @IsUrl()
  preview_url: string;

  @IsArray()
  countries: string[];

  @IsEnum(Platform)
  platform: Platform;

  @IsString()
  device: string;

  @IsString()
  package_id: string;

  @IsArray({ each: true })
  verticals: KafkaVerticalDTO[];
}

export interface KafkaPayload {
  query: {
    pubid: string;
    appid: number;
    country: string;
    platform: string;
  };
  response: {
    currency_name: string;
    offers_count: number;
    offers: KafkaOfferPayloadDto[];
  };
}
