import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SigningBonus } from '../schemas/signing-bonus.schema';
import { CreateSigningBonusDto } from '../dto/create-signing-bonus.dto';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Injectable()
export class SigningBonusService {
  constructor(
    @InjectModel(SigningBonus.name) private model: Model<SigningBonus>,
  ) {}

  async create(dto: CreateSigningBonusDto, userId: string) {
    const existing = await this.model.findOne({ code: dto.code });
    if (existing) throw new ConflictException('Signing bonus code already exists');

    const signingBonus = new this.model({
      ...dto,
      createdBy: new Types.ObjectId(userId),
      status: ApprovalStatus.PENDING,
    });

    return signingBonus.save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const signingBonus = await this.model.findById(id).exec();
    if (!signingBonus) throw new NotFoundException('Signing bonus not found');
    return signingBonus;
  }

  async approve(id: string, approverId: string) {
    const signingBonus = await this.findOne(id);
    signingBonus.status = ApprovalStatus.APPROVED;
    signingBonus.approvedBy = new Types.ObjectId(approverId);
    signingBonus.approvedAt = new Date();
    return signingBonus.save();
  }

  async reject(id: string, approverId: string, reason: string) {
    const signingBonus = await this.findOne(id);
    signingBonus.status = ApprovalStatus.REJECTED;
    signingBonus.approvedBy = new Types.ObjectId(approverId);
    signingBonus.approvedAt = new Date();
    signingBonus.rejectionReason = reason;
    return signingBonus.save();
  }

  async delete(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Signing bonus not found');
  }
}