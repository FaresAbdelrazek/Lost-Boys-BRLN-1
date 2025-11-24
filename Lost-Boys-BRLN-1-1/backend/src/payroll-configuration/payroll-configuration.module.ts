import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollPolicy, PayrollPolicySchema } from './schemas/payroll-policy.schema';
import { PayGrade, PayGradeSchema } from './schemas/pay-grade.schema';
import { PayrollPolicyService } from './services/payroll-policy.service';
import { PayGradeService } from './services/pay-grade.service';
import { PayrollPolicyController } from './controllers/payroll-policy.controller';
import { PayGradeController } from './controllers/pay-grade.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PayrollPolicy.name, schema: PayrollPolicySchema },
      { name: PayGrade.name, schema: PayGradeSchema },
    ]),
  ],
  controllers: [PayrollPolicyController, PayGradeController],
  providers: [PayrollPolicyService, PayGradeService],
  exports: [PayrollPolicyService, PayGradeService],
})
export class PayrollConfigurationModule {}