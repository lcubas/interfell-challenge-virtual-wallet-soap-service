import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MongooseAbstractRepository } from 'src/database/mongoose/mongoose-abstract-repository';
import { PaymentSessionSchema } from '../schemas/payment-session.schema';
import { Logger } from '@nestjs/common';

export class PaymentSessionRepository extends MongooseAbstractRepository<PaymentSessionSchema> {
  protected readonly logger = new Logger(PaymentSessionRepository.name);

  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(PaymentSessionSchema.name) model: Model<PaymentSessionSchema>,
  ) {
    super(model, connection);
  }
}
