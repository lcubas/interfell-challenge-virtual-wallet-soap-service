import { Injectable } from '@nestjs/common';
import { randomInt, randomUUID } from 'crypto';
import { WalletRepository } from './repositories/wallet.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { Mailer } from './mailer';
import {
  TransactionStatus,
  TransactionType,
} from './schemas/transaction.schema';
import { PaymentSessionRepository } from './repositories/payment-session.repository';
import { PaymentSessionStatus } from './schemas/payment-session.schema';

export interface RechargeWalletDTO {
  amount: number;
  documentNumber: string;
  phoneNumber: string;
}

export interface GetBalanceDTO {
  documentNumber: string;
  phoneNumber: string;
}

export interface MakePaymentDTO {
  purchaseAmount: number;
  documentNumber: string;
  phoneNumber: string;
}

export interface ConfirmPaymentDTO {
  sessionId: string;
  token: string;
}

@Injectable()
export class WalletService {
  constructor(
    private readonly mailer: Mailer,
    private readonly walletRepository: WalletRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentSessionRepository: PaymentSessionRepository,
  ) {}

  async rechargeWallet(data: RechargeWalletDTO): Promise<void> {
    if (data.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    await this.walletRepository.rechargeWalletByCustomerData(
      data.documentNumber,
      data.phoneNumber,
      data.amount,
    );
  }

  async getBalance(data: GetBalanceDTO) {
    const wallet = await this.walletRepository.findByCustomerData(
      data.documentNumber,
      data.phoneNumber,
    );

    return wallet.balance;
  }

  async makePayment(data: MakePaymentDTO) {
    if (data.purchaseAmount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const wallet = await this.walletRepository.findByCustomerData(
      data.documentNumber,
      data.phoneNumber,
    );

    if (wallet.balance < data.purchaseAmount) {
      throw new Error('Insufficient funds');
    }

    const newTransaction = {
      walletId: wallet._id,
      amount: data.purchaseAmount,
      type: TransactionType.PAYMENT,
      status: TransactionStatus.PENDING,
    };

    const sessionId = randomUUID();
    const token = randomInt(100000, 999999).toString();

    const newPaymentSession = {
      token,
      sessionId,
      status: PaymentSessionStatus.PENDING,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expires in 10 minutes
    };

    await this.transactionRepository.createWithPaymentSession(
      newTransaction,
      newPaymentSession,
    );

    await this.mailer.sendMail();
  }

  async confirmPayment(data: ConfirmPaymentDTO) {
    const paymentSession = await this.paymentSessionRepository.findOne({
      sessionId: data.sessionId,
      token: data.token,
    });

    if (
      paymentSession.expiresAt < new Date() ||
      paymentSession.status === PaymentSessionStatus.CONFIRMED
    ) {
      throw new Error('Payment session expired or already confirmed');
    }

    const session = await this.transactionRepository.startTransaction();

    try {
      const transaction = await this.transactionRepository.findOneAndUpdate(
        { _id: paymentSession.transactionId },
        { status: TransactionStatus.APPROVED },
        { session },
      );
      await this.walletRepository.findOneAndUpdate(
        { _id: transaction.walletId },
        { $inc: { balance: -transaction.amount } },
      );
      await this.paymentSessionRepository.findOneAndUpdate(
        { _id: paymentSession._id },
        { status: PaymentSessionStatus.CONFIRMED },
        { session },
      );
      session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
}
