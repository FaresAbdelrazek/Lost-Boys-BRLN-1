import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApprovalStatus } from '../../common/enums/approval-status.enum';

@Schema({ timestamps: true })
export class PayGrade extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  minSalary: number;

  @Prop({ type: Number, required: true })
  maxSalary: number;

  @Prop({ required: true, default: 'USD' })
  currency: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Position' }] })
  positions: Types.ObjectId[];

  @Prop({ type: Object })
  progressionRules?: {
    minTenureMonths: number;
    performanceThreshold: number;
    autoPromote: boolean;
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

export const PayGradeSchema = SchemaFactory.createForClass(PayGrade);

// Add validation
PayGradeSchema.pre('save', function (next) {
  if (this.minSalary >= this.maxSalary) {
    throw new Error('Minimum salary must be less than maximum salary');
  }
  next();
});