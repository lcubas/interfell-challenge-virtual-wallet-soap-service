import { Prop, Schema } from '@nestjs/mongoose';
import { MongooseBaseSchema } from 'src/database/mongoose/mongoose-base-schema';

@Schema({ versionKey: false, collection: 'transactions' })
export class TransactionSchema extends MongooseBaseSchema {
  @Prop({ required: true })
  amount: number;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ required: true })
  walletId: string;
}
