import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBoolean, IsOptional, IsArray, Min, Max } from 'class-validator';
import { AllowanceType, CalculationMethod, PaymentFrequency } from '../../common/enums/approval-status.enum';

export class CreateAllowanceDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(AllowanceType)
  type: AllowanceType;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(CalculationMethod)
  calculationMethod: CalculationMethod;

  @IsNumber()
  @Min(0)
  @IsOptional()
  fixedAmount?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  percentageOfSalary?: number;

  @IsEnum(PaymentFrequency)
  @IsOptional()
  paymentFrequency?: PaymentFrequency;

  @IsBoolean()
  @IsOptional()
  isTaxable?: boolean;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxCap?: number;

  @IsArray()
  @IsOptional()
  eligibleGrades?: string[];

  @IsArray()
  @IsOptional()
  eligiblePositions?: string[];

  @IsArray()
  @IsOptional()
  eligibleDepartments?: string[];
}