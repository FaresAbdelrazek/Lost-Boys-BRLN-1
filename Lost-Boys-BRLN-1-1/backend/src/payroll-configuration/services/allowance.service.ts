import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Allowance } from '../schemas/allowance.schema';
import { CreateAllowanceDto } from '../dto/create-allowance.dto';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Injectable()
export class AllowanceService {
  constructor(
    @InjectModel(Allowance.name) private model: Model<Allowance>,
  ) {}

  async create(dto: CreateAllowanceDto, userId: string) {
    const existing = await this.model.findOne({ code: dto.code });
    if (existing) throw new ConflictException('Allowance code already exists');

    const allowance = new this.model({
      ...dto,
      createdBy: new Types.ObjectId(userId),
      status: ApprovalStatus.PENDING,
    });

    return allowance.save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const allowance = await this.model.findById(id).exec();
    if (!allowance) throw new NotFoundException('Allowance not found');
    return allowance;
  }

  async approve(id: string, approverId: string) {
    const allowance = await this.findOne(id);
    allowance.status = ApprovalStatus.APPROVED;
    allowance.approvedBy = new Types.ObjectId(approverId);
    allowance.approvedAt = new Date();
    return allowance.save();
  }

  async reject(id: string, approverId: string, reason: string) {
    const allowance = await this.findOne(id);
    allowance.status = ApprovalStatus.REJECTED;
    allowance.approvedBy = new Types.ObjectId(approverId);
    allowance.approvedAt = new Date();
    allowance.rejectionReason = reason;
    return allowance.save();
  }

  async delete(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Allowance not found');
  }
}