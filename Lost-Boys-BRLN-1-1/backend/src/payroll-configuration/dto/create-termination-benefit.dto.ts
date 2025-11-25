import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateTerminationBenefitDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['WITH_CAUSE', 'WITHOUT_CAUSE', 'REDUNDANCY'])
  terminationType: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  severanceRules?: {
    enabled: boolean;
    calculationMethod: 'FIXED' | 'YEARS_OF_SERVICE';
    fixedAmount?: number;
    monthsPerYearOfService?: number;
    maxMonths?: number;
  };

  @IsOptional()
  noticePeriodRules?: {
    noticePeriodDays: number;
    paymentInLieuAllowed: boolean;
  };

  @IsOptional()
  leaveEncashmentRules?: {
    enabled: boolean;
    maxDays: number;
    onlyWithoutCause: boolean;
  };

  @IsOptional()
  gratuityRules?: {
    enabled: boolean;
    calculationFormula: string;
    forfeitedIfWithCause: boolean;
  };

  @IsOptional()
  transitionBenefits?: {
    outplacementSupport: boolean;
    extendedHealthInsurance: boolean;
    insuranceMonths: number;
  };
}