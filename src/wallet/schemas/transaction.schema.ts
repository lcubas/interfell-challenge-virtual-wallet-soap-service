import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { MongooseBaseSchema } from 'src/database/mongoose/mongoose-base-schema';

export enum TransactionType {
  DEPOSIT = 'deposit',
  PAYMENT = 'payment',
}

export enum TransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
}

@Schema({
  versionKey: false,
  collection: 'transactions',
  timestamps: {
    updatedAt: false,
  },
})
export class TransactionSchema extends MongooseBaseSchema {
  @Prop({ required: true, type: Types.ObjectId })
  walletId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: TransactionType })
  type: TransactionType;

  @Prop({ required: true, enum: TransactionStatus })
  status: TransactionStatus;

  @Prop({ type: Map })
  metadata: Record<string, any>;

  @Prop()
  creadtedAt: Date;

  @Prop()
  updatedAt: Date;
}
