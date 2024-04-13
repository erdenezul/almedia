import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class KafkaVerticalDto {
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

  @IsArray({})
  @ValidateNested({ each: true })
  @Type(() => KafkaVerticalDto)
  verticals: KafkaVerticalDto[];
}

export class QueryDto {
  @IsString()
  pubid: string;
  @IsNumber()
  appid: number;
  @IsString()
  country: string;
  @IsString()
  platform: string;
}

export class ResponseDto {
  @IsString()
  currency_name: string;
  @IsNumber()
  offers_count: number;

  @IsArray({})
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => KafkaOfferPayloadDto)
  offers: KafkaOfferPayloadDto[];
}

export class KafkaPayloadDto {
  @ValidateNested({ always: true })
  @Type(() => QueryDto)
  query: QueryDto;

  @ValidateNested()
  @Type(() => ResponseDto)
  response: ResponseDto;
}
