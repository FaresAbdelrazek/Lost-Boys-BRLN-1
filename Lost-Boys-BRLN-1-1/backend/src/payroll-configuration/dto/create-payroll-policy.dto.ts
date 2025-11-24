import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber, IsBoolean } from 'class-validator';

export class CreatePayrollPolicyDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  effectiveDate?: Date;

  @IsOptional()
  expirationDate?: Date;

  @IsArray()
  @IsOptional()
  departments?: string[];

  @IsArray()
  @IsOptional()
  positions?: string[];

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsBoolean()
  @IsOptional()
  allowOverride?: boolean;
}