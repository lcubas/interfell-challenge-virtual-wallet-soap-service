import { Prop, Schema } from '@nestjs/mongoose';
import { MongooseBaseSchema } from 'src/database/mongoose/mongoose-base-schema';

export interface CustomerData {
  id: string;
  phoneNumber: string;
  documentNumber: string;
}

@Schema({ versionKey: false, collection: 'wallets' })
export class WalletSchema extends MongooseBaseSchema {
  @Prop({ required: true })
  customer: CustomerData;

  @Prop({ required: true })
  balance: number;
}
