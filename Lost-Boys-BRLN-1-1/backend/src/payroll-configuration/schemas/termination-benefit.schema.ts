import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Schema({ timestamps: true })
export class TerminationBenefit extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ 
    type: String, 
    enum: ['WITH_CAUSE', 'WITHOUT_CAUSE', 'REDUNDANCY'], 
    required: true 
  })
  terminationType: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object })
  severanceRules?: {
    enabled: boolean;
    calculationMethod: 'FIXED' | 'YEARS_OF_SERVICE';
    fixedAmount?: number;
    monthsPerYearOfService?: number;
    maxMonths?: number;
  };

  @Prop({ type: Object })
  noticePeriodRules: {
    noticePeriodDays: number;
    paymentInLieuAllowed: boolean;
  };

  @Prop({ type: Object })
  leaveEncashmentRules: {
    enabled: boolean;
    maxDays: number;
    onlyWithoutCause: boolean;
  };

  @Prop({ type: Object })
  gratuityRules: {
    enabled: boolean;
    calculationFormula: string;
    forfeitedIfWithCause: boolean;
  };

  @Prop({ type: Object })
  transitionBenefits?: {
    outplacementSupport: boolean;
    extendedHealthInsurance: boolean;
    insuranceMonths: number;
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

export const TerminationBenefitSchema = SchemaFactory.createForClass(TerminationBenefit);