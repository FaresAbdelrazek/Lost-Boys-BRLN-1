import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayrollModule } from './payroll/payroll.module';

@Module({
  imports: [PayrollModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
