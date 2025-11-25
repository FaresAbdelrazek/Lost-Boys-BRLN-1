import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { SigningBonusService } from '../services/signing-bonus.service';
import { CreateSigningBonusDto } from '../dto/create-signing-bonus.dto';

@Controller('payroll-configuration/signing-bonuses')
export class SigningBonusController {
  constructor(private readonly service: SigningBonusService) {}

  @Post()
  create(@Body() dto: CreateSigningBonusDto) {
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