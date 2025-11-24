import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollPolicy, PayrollPolicySchema } from './schemas/payroll-policy.schema';
import { PayGrade, PayGradeSchema } from './schemas/pay-grade.schema';
import { PayType, PayTypeSchema } from './schemas/pay-type.schema';
import { PayrollPolicyService } from './services/payroll-policy.service';
import { PayGradeService } from './services/pay-grade.service';
import { PayTypeService } from './services/pay-type.service';
import { PayrollPolicyController } from './controllers/payroll-policy.controller';
import { PayGradeController } from './controllers/pay-grade.controller';
import { PayTypeController } from './controllers/pay-type.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PayrollPolicy.name, schema: PayrollPolicySchema },
      { name: PayGrade.name, schema: PayGradeSchema },
      { name: PayType.name, schema: PayTypeSchema },
    ]),
  ],
  controllers: [PayrollPolicyController, PayGradeController, PayTypeController],
  providers: [PayrollPolicyService, PayGradeService, PayTypeService],
  exports: [PayrollPolicyService, PayGradeService, PayTypeService],
})
export class PayrollConfigurationModule {}
