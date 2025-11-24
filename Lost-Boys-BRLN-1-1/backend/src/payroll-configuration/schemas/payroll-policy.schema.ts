import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Schema({ timestamps: true })
export class PayrollPolicy extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date, required: true })
  effectiveDate: Date;

  @Prop({ type: Date })
  expirationDate?: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Department' }] })
  departments: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Position' }] })
  positions: Types.ObjectId[];

  @Prop({ type: Number, default: 1 })
  priority: number;

  @Prop({ type: Boolean, default: false })
  allowOverride: boolean;

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

export const PayrollPolicySchema = SchemaFactory.createForClass(PayrollPolicy);