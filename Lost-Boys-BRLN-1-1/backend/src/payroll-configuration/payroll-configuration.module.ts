import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollPolicy, PayrollPolicySchema } from './schemas/payroll-policy.schema';
import { PayGrade, PayGradeSchema } from './schemas/pay-grade.schema';
import { PayType, PayTypeSchema } from './schemas/pay-type.schema';
import { Allowance, AllowanceSchema } from './schemas/allowance.schema';
import { SigningBonus, SigningBonusSchema } from './schemas/signing-bonus.schema';
import { ResignationBenefit, ResignationBenefitSchema } from './schemas/resignation-benefit.schema';
import { PayrollPolicyService } from './services/payroll-policy.service';
import { PayGradeService } from './services/pay-grade.service';
import { PayTypeService } from './services/pay-type.service';
import { AllowanceService } from './services/allowance.service';
import { SigningBonusService } from './services/signing-bonus.service';
import { ResignationBenefitService } from './services/resignation-benefit.service';
import { PayrollPolicyController } from './controllers/payroll-policy.controller';
import { PayGradeController } from './controllers/pay-grade.controller';
import { PayTypeController } from './controllers/pay-type.controller';
import { AllowanceController } from './controllers/allowance.controller';
import { SigningBonusController } from './controllers/signing-bonus.controller';
import { ResignationBenefitController } from './controllers/resignation-benefit.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PayrollPolicy.name, schema: PayrollPolicySchema },
      { name: PayGrade.name, schema: PayGradeSchema },
      { name: PayType.name, schema: PayTypeSchema },
      { name: Allowance.name, schema: AllowanceSchema },
      { name: SigningBonus.name, schema: SigningBonusSchema },
      { name: ResignationBenefit.name, schema: ResignationBenefitSchema },
    ]),
  ],
  controllers: [
    PayrollPolicyController, 
    PayGradeController, 
    PayTypeController, 
    AllowanceController,
    SigningBonusController,
    ResignationBenefitController,
  ],
  providers: [
    PayrollPolicyService, 
    PayGradeService, 
    PayTypeService, 
    AllowanceService,
    SigningBonusService,
    ResignationBenefitService,
  ],
  exports: [
    PayrollPolicyService, 
    PayGradeService, 
    PayTypeService, 
    AllowanceService,
    SigningBonusService,
    ResignationBenefitService,
  ],
})
export class PayrollConfigurationModule {}