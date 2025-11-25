import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsEnum, Min } from 'class-validator';

export class CreateSigningBonusDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  eligiblePositions?: string[];

  @IsArray()
  @IsOptional()
  eligibleGrades?: string[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  fixedAmount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  percentageOfSalary?: number;

  @IsEnum(['LUMP_SUM', 'INSTALLMENTS'])
  @IsOptional()
  paymentSchedule?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  numberOfInstallments?: number;

  @IsNumber()
  @Min(0)
  vestingPeriodMonths: number;

  @IsOptional()
  clawbackRules?: {
    enabled: boolean;
    fullClawbackMonths: number;
    partialClawbackMonths: number;
    partialClawbackPercentage: number;
  };
}