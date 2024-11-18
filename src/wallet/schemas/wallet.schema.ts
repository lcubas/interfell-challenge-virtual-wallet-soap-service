import { Prop, Schema } from '@nestjs/mongoose';
import { MongooseBaseSchema } from 'src/database/mongoose/mongoose-base-schema';

export enum WalletStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface CustomerData {
  id: string;
  phoneNumber: string;
  documentNumber: string;
}

@Schema({
  versionKey: false,
  collection: 'wallets',
  timestamps: {
    updatedAt: 'last_updated_at',
  },
})
export class WalletSchema extends MongooseBaseSchema {
  @Prop({
    type: Map,
    required: true,
  })
  customer: CustomerData;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop({ default: 'PE' })
  currency: string;

  @Prop({ enum: WalletStatus, default: WalletStatus.ACTIVE })
  status: WalletStatus;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}
