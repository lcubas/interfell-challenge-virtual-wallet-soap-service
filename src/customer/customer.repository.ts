import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CustomerSchema } from './customer.schema';
import { MongooseAbstractRepository } from 'src/database/mongoose/mongoose-abstract-repository';

export class CustomerRepository extends MongooseAbstractRepository<CustomerSchema> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(CustomerSchema.name) model: Model<CustomerSchema>,
  ) {
    super(model, connection);
  }
}
