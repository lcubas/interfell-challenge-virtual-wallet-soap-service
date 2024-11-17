import { Injectable } from '@nestjs/common';
import { WalletRepository } from './repositories/wallet.repository';
import { TransactionRepository } from './repositories/transactions.repository';

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

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async rechargeWallet(data: RechargeWalletDTO): Promise<void> {
    if (data.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    await this.walletRepository.findOneAndUpdate(
      {
        'customer.documentNumber': {
          $eq: data.documentNumber,
        },
        'customer.phoneNumber': {
          $eq: data.phoneNumber,
        },
      },
      {
        $inc: {
          balance: data.amount,
        },
      },
    );
  }

  async getBalance(data: GetBalanceDTO) {
    const wallet = await this.walletRepository.findOne({
      'customer.documentNumber': {
        $eq: data.documentNumber,
      },
      'customer.phoneNumber': {
        $eq: data.phoneNumber,
      },
    });

    return wallet.balance;
  }

  async makePayment(data: MakePaymentDTO) {
    const wallet = await this.walletRepository.findOne({
      'customer.documentNumber': {
        $eq: data.documentNumber,
      },
      'customer.phoneNumber': {
        $eq: data.phoneNumber,
      },
    });

    if (wallet.balance < data.purchaseAmount) {
      throw new Error('Insufficient funds');
    }
  }

  async confirmPayment() {}
}
