import { IsString, IsUrl, ValidateNested } from 'class-validator';

export class RestOfferPayloadDto {
  @IsString()
  campaign_id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  instructions: string;

  @IsString()
  tracking_url: string;

  @IsUrl()
  icon: string;
}

export class OsInfo {
  android: boolean;
  web: boolean;
  ios: boolean;
}

export class RestPayloadDto {
  status: string;
  @ValidateNested()
  data: Record<string, { Offer: RestOfferPayloadDto; OS: OsInfo }>;
}
