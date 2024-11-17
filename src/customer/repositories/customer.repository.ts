import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CustomerSchema } from '../schemas/customer.schema';
import { MongooseAbstractRepository } from 'src/database/mongoose/mongoose-abstract-repository';
import { WalletRepository } from 'src/wallet/repositories/wallet.repository';
import { CreateCustomerDTO } from '../customer.service';

export class CustomerRepository extends MongooseAbstractRepository<CustomerSchema> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(CustomerSchema.name) model: Model<CustomerSchema>,
    private readonly walletRepository: WalletRepository,
  ) {
    super(model, connection);
  }

  async createWithWallet(customer: CreateCustomerDTO) {
    const mongooseSession = await this.startTransaction();

    try {
      const newCustomer = await this.create(customer, {
        session: mongooseSession,
      });
      await this.walletRepository.create(
        {
          customer: {
            id: newCustomer._id.toString(),
            phoneNumber: newCustomer.phoneNumber,
            documentNumber: newCustomer.documentNumber,
          },
        },
        { session: mongooseSession },
      );
      await mongooseSession.commitTransaction();
      return newCustomer;
    } catch (error) {
      await mongooseSession.abortTransaction();
      throw error;
    }
  }
}
