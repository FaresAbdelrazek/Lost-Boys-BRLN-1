import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateResignationBenefitDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  requiredNoticePeriodDays: number;

  @IsOptional()
  gratuityRules?: {
    enabled: boolean;
    calculationFormula: string;
    minYearsOfService: number;
  };

  @IsOptional()
  leaveEncashmentRules?: {
    enabled: boolean;
    maxDays: number;
    dailyRateFormula: string;
  };

  @IsOptional()
  proratedAllowancesRules?: {
    enabled: boolean;
    allowanceTypes: string[];
  };
}