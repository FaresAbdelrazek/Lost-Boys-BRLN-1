import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayrollConfigurationModule } from './payroll-configuration/payroll-configuration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/hr-system'),
    PayrollConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}