import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { 
  ApprovalStatus, 
  AllowanceType, 
  CalculationMethod,
  PaymentFrequency 
} from '../../common/enums/approval-status.enum';

@Schema({ timestamps: true })
export class Allowance extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ 
    type: String, 
    enum: AllowanceType, 
    required: true 
  })
  type: AllowanceType;

  @Prop({ required: true })
  description: string;

  @Prop({ 
    type: String, 
    enum: CalculationMethod, 
    required: true 
  })
  calculationMethod: CalculationMethod;

  @Prop({ type: Number })
  fixedAmount?: number;

  @Prop({ type: Number })
  percentageOfSalary?: number;

  @Prop({ 
    type: String, 
    enum: PaymentFrequency, 
    default: PaymentFrequency.MONTHLY 
  })
  paymentFrequency: PaymentFrequency;

  @Prop({ type: Boolean, default: true })
  isTaxable: boolean;

  @Prop({ type: Number })
  maxCap?: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PayGrade' }] })
  eligibleGrades?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Position' }] })
  eligiblePositions?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Department' }] })
  eligibleDepartments?: Types.ObjectId[];

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

export const AllowanceSchema = SchemaFactory.createForClass(Allowance);
