import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class MongooseBaseSchema {
  @Prop({ type: Types.ObjectId, required: true })
  readonly _id: Types.ObjectId;
}
