import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { MongooseBaseSchema } from 'src/database/mongoose/mongoose-base-schema';

export enum PaymentSessionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  EXPIRED = 'expired',
}

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'payment_sessions',
})
export class PaymentSessionSchema extends MongooseBaseSchema {
  @Prop({ required: true, type: Types.ObjectId })
  transactionId: Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({
    enum: PaymentSessionStatus,
    default: PaymentSessionStatus.PENDING,
  })
  status: PaymentSessionStatus;

  @Prop({ type: Map })
  metadata: Record<string, any>;

  @Prop()
  creadtedAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ required: true })
  expiresAt: Date;
}
