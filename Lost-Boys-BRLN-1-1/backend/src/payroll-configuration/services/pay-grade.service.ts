import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PayGrade } from '../schemas/pay-grade.schema';
import { CreatePayGradeDto } from '../dto/create-pay-grade.dto';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Injectable()
export class PayGradeService {
  constructor(
    @InjectModel(PayGrade.name) private model: Model<PayGrade>,
  ) {}

  async create(dto: CreatePayGradeDto, userId: string) {
    const existing = await this.model.findOne({ code: dto.code });
    if (existing) throw new ConflictException('Pay grade code already exists');

    if (dto.minSalary >= dto.maxSalary) {
      throw new ConflictException('Minimum salary must be less than maximum salary');
    }

    const payGrade = new this.model({
      ...dto,
      createdBy: new Types.ObjectId(userId),
      status: ApprovalStatus.PENDING,
    });

    return payGrade.save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const payGrade = await this.model.findById(id).exec();
    if (!payGrade) throw new NotFoundException('Pay grade not found');
    return payGrade;
  }

  async approve(id: string, approverId: string) {
    const payGrade = await this.findOne(id);
    payGrade.status = ApprovalStatus.APPROVED;
    payGrade.approvedBy = new Types.ObjectId(approverId);
    payGrade.approvedAt = new Date();
    return payGrade.save();
  }

  async reject(id: string, approverId: string, reason: string) {
    const payGrade = await this.findOne(id);
    payGrade.status = ApprovalStatus.REJECTED;
    payGrade.approvedBy = new Types.ObjectId(approverId);
    payGrade.approvedAt = new Date();
    payGrade.rejectionReason = reason;
    return payGrade.save();
  }

  async delete(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Pay grade not found');
  }
}