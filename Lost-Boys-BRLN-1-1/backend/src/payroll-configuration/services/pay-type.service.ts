import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PayType } from '../schemas/pay-type.schema';
import { CreatePayTypeDto } from '../dto/create-pay-type.dto';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Injectable()
export class PayTypeService {
  constructor(
    @InjectModel(PayType.name) private model: Model<PayType>,
  ) {}

  async create(dto: CreatePayTypeDto, userId: string) {
    const existing = await this.model.findOne({ code: dto.code });
    if (existing) throw new ConflictException('Pay type code already exists');

    const payType = new this.model({
      ...dto,
      createdBy: new Types.ObjectId(userId),
      status: ApprovalStatus.PENDING,
    });

    return payType.save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const payType = await this.model.findById(id).exec();
    if (!payType) throw new NotFoundException('Pay type not found');
    return payType;
  }

  async approve(id: string, approverId: string) {
    const payType = await this.findOne(id);
    payType.status = ApprovalStatus.APPROVED;
    payType.approvedBy = new Types.ObjectId(approverId);
    payType.approvedAt = new Date();
    return payType.save();
  }

  async reject(id: string, approverId: string, reason: string) {
    const payType = await this.findOne(id);
    payType.status = ApprovalStatus.REJECTED;
    payType.approvedBy = new Types.ObjectId(approverId);
    payType.approvedAt = new Date();
    payType.rejectionReason = reason;
    return payType.save();
  }

  async delete(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Pay type not found');
  }
}