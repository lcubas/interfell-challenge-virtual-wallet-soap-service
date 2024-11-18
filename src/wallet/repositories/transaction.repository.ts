import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { MongooseAbstractRepository } from 'src/database/mongoose/mongoose-abstract-repository';
import { TransactionSchema } from '../schemas/transaction.schema';
import { PaymentSessionRepository } from './payment-session.repository';
import { PaymentSessionSchema } from '../schemas/payment-session.schema';

export class TransactionRepository extends MongooseAbstractRepository<TransactionSchema> {
  protected readonly logger = new Logger(TransactionRepository.name);

  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(TransactionSchema.name) model: Model<TransactionSchema>,
    private readonly paymentSessionRepository: PaymentSessionRepository,
  ) {
    super(model, connection);
  }

  async createWithPaymentSession(
    transaction: Partial<TransactionSchema>,
    paymentSession: Partial<PaymentSessionSchema>,
  ) {
    const session = await this.startTransaction();

    try {
      const newTransaction = await this.create(transaction, {
        session: session,
      });
      const newPaymentSession = await this.paymentSessionRepository.create(
        {
          ...paymentSession,
          transactionId: new Types.ObjectId(newTransaction._id),
        },
        { session },
      );
      await session.commitTransaction();
      return { newTransaction, newPaymentSession };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
}
