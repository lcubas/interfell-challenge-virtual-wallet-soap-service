import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MongooseAbstractRepository } from 'src/database/mongoose/mongoose-abstract-repository';
import { WalletSchema } from '../schemas/wallet.schema';

export class WalletRepository extends MongooseAbstractRepository<WalletSchema> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(WalletSchema.name) model: Model<WalletSchema>,
  ) {
    super(model, connection);
  }
}
