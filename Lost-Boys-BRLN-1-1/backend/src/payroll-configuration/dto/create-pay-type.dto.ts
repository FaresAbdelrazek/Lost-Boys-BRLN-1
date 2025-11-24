import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { CalculationMethod } from '../../common/enums/approval-status.enum';

export class CreatePayTypeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(CalculationMethod)
  calculationMethod: CalculationMethod;

  @IsBoolean()
  @IsOptional()
  isTaxable?: boolean;

  @IsBoolean()
  @IsOptional()
  isInsurable?: boolean;

  @IsOptional()
  prorationRules?: {
    proratable: boolean;
    method: 'DAILY' | 'HOURLY' | 'CALENDAR_DAYS';
  };

  @IsArray()
  @IsOptional()
  payrollComponents?: string[];
}