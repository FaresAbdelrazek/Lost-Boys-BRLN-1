import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ResignationBenefit } from '../schemas/resignation-benefit.schema';
import { CreateResignationBenefitDto } from '../dto/create-resignation-benefit.dto';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Injectable()
export class ResignationBenefitService {
  constructor(
    @InjectModel(ResignationBenefit.name) private model: Model<ResignationBenefit>,
  ) {}

  async create(dto: CreateResignationBenefitDto, userId: string) {
    const existing = await this.model.findOne({ code: dto.code });
    if (existing) throw new ConflictException('Resignation benefit code already exists');

    const benefit = new this.model({
      ...dto,
      createdBy: new Types.ObjectId(userId),
      status: ApprovalStatus.PENDING,
    });

    return benefit.save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const benefit = await this.model.findById(id).exec();
    if (!benefit) throw new NotFoundException('Resignation benefit not found');
    return benefit;
  }

  async approve(id: string, approverId: string) {
    const benefit = await this.findOne(id);
    benefit.status = ApprovalStatus.APPROVED;
    benefit.approvedBy = new Types.ObjectId(approverId);
    benefit.approvedAt = new Date();
    return benefit.save();
  }

  async reject(id: string, approverId: string, reason: string) {
    const benefit = await this.findOne(id);
    benefit.status = ApprovalStatus.REJECTED;
    benefit.approvedBy = new Types.ObjectId(approverId);
    benefit.approvedAt = new Date();
    benefit.rejectionReason = reason;
    return benefit.save();
  }

  async delete(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Resignation benefit not found');
  }
}