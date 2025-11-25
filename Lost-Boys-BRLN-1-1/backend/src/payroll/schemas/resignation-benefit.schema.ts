import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Schema({ timestamps: true })
export class ResignationBenefit extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  requiredNoticePeriodDays: number;

  @Prop({ type: Object, required: true })
  gratuityRules: {
    enabled: boolean;
    calculationFormula: string;
    minYearsOfService: number;
  };

  @Prop({ type: Object, required: true })
  leaveEncashmentRules: {
    enabled: boolean;
    maxDays: number;
    dailyRateFormula: string;
  };

  @Prop({ type: Object })
  proratedAllowancesRules: {
    enabled: boolean;
    allowanceTypes: string[];
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

export const ResignationBenefitSchema = SchemaFactory.createForClass(ResignationBenefit);