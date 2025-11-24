import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApprovalStatus, CalculationMethod } from '../../common/enums/approval-status.enum';

@Schema({ timestamps: true })
export class PayType extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ 
    type: String, 
    enum: CalculationMethod, 
    required: true 
  })
  calculationMethod: CalculationMethod;

  @Prop({ type: Boolean, default: true })
  isTaxable: boolean;

  @Prop({ type: Boolean, default: true })
  isInsurable: boolean;

  @Prop({ type: Object })
  prorationRules?: {
    proratable: boolean;
    method: 'DAILY' | 'HOURLY' | 'CALENDAR_DAYS';
  };

  @Prop({ type: [String], default: [] })
  payrollComponents: string[];

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

export const PayTypeSchema = SchemaFactory.createForClass(PayType);
