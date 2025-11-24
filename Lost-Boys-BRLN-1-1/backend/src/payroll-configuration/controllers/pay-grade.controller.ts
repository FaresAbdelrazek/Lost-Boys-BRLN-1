import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { PayGradeService } from '../services/pay-grade.service';
import { CreatePayGradeDto } from '../dto/create-pay-grade.dto';

@Controller('payroll-configuration/pay-grades')
export class PayGradeController {
  constructor(private readonly service: PayGradeService) {}

  @Post()
  create(@Body() dto: CreatePayGradeDto) {
    return this.service.create(dto, '507f1f77bcf86cd799439011');
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.service.approve(id, '507f1f77bcf86cd799439012');
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string, @Body('reason') reason: string) {
    return this.service.reject(id, '507f1f77bcf86cd799439012', reason);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}