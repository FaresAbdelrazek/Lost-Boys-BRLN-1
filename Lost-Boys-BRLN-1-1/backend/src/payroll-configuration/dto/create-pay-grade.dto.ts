import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreatePayGradeDto {
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
  minSalary: number;

  @IsNumber()
  @Min(0)
  maxSalary: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsOptional()
  positions?: string[];

  @IsOptional()
  progressionRules?: {
    minTenureMonths: number;
    performanceThreshold: number;
    autoPromote: boolean;
  };
}
