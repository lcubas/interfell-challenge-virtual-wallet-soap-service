import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MongooseAbstractRepository } from 'src/database/mongoose/mongoose-abstract-repository';
import { WalletSchema } from '../schemas/wallet.schema';
import { Logger } from '@nestjs/common';

export class WalletRepository extends MongooseAbstractRepository<WalletSchema> {
  protected readonly logger = new Logger(WalletRepository.name, {
    timestamp: true,
  });

  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(WalletSchema.name) model: Model<WalletSchema>,
  ) {
    super(model, connection);
  }
}
