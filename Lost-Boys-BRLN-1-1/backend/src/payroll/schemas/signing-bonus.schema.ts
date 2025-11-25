import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Schema({ timestamps: true })
export class SigningBonus extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Position' }] })
  eligiblePositions: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PayGrade' }] })
  eligibleGrades: Types.ObjectId[];

  @Prop({ type: Number })
  fixedAmount?: number;

  @Prop({ type: Number })
  percentageOfSalary?: number;

  @Prop({ 
    type: String, 
    enum: ['LUMP_SUM', 'INSTALLMENTS'], 
    default: 'LUMP_SUM' 
  })
  paymentSchedule: string;

  @Prop({ type: Number })
  numberOfInstallments?: number;

  @Prop({ type: Number, required: true })
  vestingPeriodMonths: number;

  @Prop({ type: Object })
  clawbackRules: {
    enabled: boolean;
    fullClawbackMonths: number;
    partialClawbackMonths: number;
    partialClawbackPercentage: number;
  };

  @Prop({ 
    type: String, 
    enum: ApprovalStatus, 
    default: ApprovalStatus.PENDING 
  })
  status: ApprovalStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy?: Types.ObjectId;

  @Prop({ type: Date })
  approvedAt?: Date;

  @Prop()
  rejectionReason?: string;

  @Prop({ type: Number, default: 1 })
  version: number;
}

export const SigningBonusSchema = SchemaFactory.createForClass(SigningBonus);