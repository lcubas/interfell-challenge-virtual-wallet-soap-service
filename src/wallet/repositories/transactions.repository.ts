import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MongooseAbstractRepository } from 'src/database/mongoose/mongoose-abstract-repository';
import { TransactionSchema } from '../schemas/transaction.schema';

export class TransactionRepository extends MongooseAbstractRepository<TransactionSchema> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(TransactionSchema.name) model: Model<TransactionSchema>,
  ) {
    super(model, connection);
  }
}
