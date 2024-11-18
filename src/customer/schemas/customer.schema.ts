import { Prop, Schema } from '@nestjs/mongoose';
import { MongooseBaseSchema } from 'src/database/mongoose/mongoose-base-schema';

@Schema({
  versionKey: false,
  collection: 'customers',
  timestamps: true,
})
export class CustomerSchema extends MongooseBaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  documentNumber: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  creadtedAt: Date;

  @Prop()
  updatedAt: Date;
}
