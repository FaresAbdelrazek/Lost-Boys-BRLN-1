import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PayrollPolicy } from '../schemas/payroll-policy.schema';
import { CreatePayrollPolicyDto } from '../dto/create-payroll-policy.dto';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Injectable()
export class PayrollPolicyService {
  constructor(
    @InjectModel(PayrollPolicy.name) private model: Model<PayrollPolicy>,
  ) {}

  async create(dto: CreatePayrollPolicyDto, userId: string) {
    const policy = new this.model({
      ...dto,
      createdBy: new Types.ObjectId(userId),
      status: ApprovalStatus.PENDING,
    });
    return policy.save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const policy = await this.model.findById(id).exec();
    if (!policy) throw new NotFoundException('Policy not found');
    return policy;
  }

  async approve(id: string, approverId: string) {
    const policy = await this.findOne(id);
    policy.status = ApprovalStatus.APPROVED;
    policy.approvedBy = new Types.ObjectId(approverId);
    policy.approvedAt = new Date();
    return policy.save();
  }

  async reject(id: string, approverId: string, reason: string) {
    const policy = await this.findOne(id);
    policy.status = ApprovalStatus.REJECTED;
    policy.approvedBy = new Types.ObjectId(approverId);
    policy.approvedAt = new Date();
    policy.rejectionReason = reason;
    return policy.save();
  }

  async delete(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Policy not found');
  }
}