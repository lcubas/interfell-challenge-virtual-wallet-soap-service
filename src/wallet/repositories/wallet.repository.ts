import { forwardRef, Inject, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MongooseAbstractRepository } from 'src/database/mongoose/mongoose-abstract-repository';
import { WalletSchema } from '../schemas/wallet.schema';
import { TransactionRepository } from './transaction.repository';
import {
  TransactionStatus,
  TransactionType,
} from '../schemas/transaction.schema';

export class WalletRepository extends MongooseAbstractRepository<WalletSchema> {
  protected readonly logger = new Logger(WalletRepository.name);

  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(WalletSchema.name) model: Model<WalletSchema>,
    @Inject(forwardRef(() => TransactionRepository))
    private readonly transactionRepository: TransactionRepository,
  ) {
    super(model, connection);
  }

  async findByCustomerData(documentNumber: string, phoneNumber: string) {
    return await this.findOne({
      'customer.documentNumber': {
        $eq: documentNumber,
      },
      'customer.phoneNumber': {
        $eq: phoneNumber,
      },
    });
  }

  async rechargeWalletByCustomerData(
    documentNumber: string,
    phoneNumber: string,
    amount: number,
  ) {
    const session = await this.startTransaction();

    try {
      const wallet = await this.findOneAndUpdate(
        {
          'customer.documentNumber': {
            $eq: documentNumber,
          },
          'customer.phoneNumber': {
            $eq: phoneNumber,
          },
        },
        {
          $inc: {
            balance: amount,
          },
        },
        { session },
      );

      await this.transactionRepository.create(
        {
          amount,
          walletId: wallet._id,
          type: TransactionType.DEPOSIT,
          status: TransactionStatus.APPROVED,
        },
        { session },
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      this.logger.warn(error);
      throw error;
    }
  }
}
