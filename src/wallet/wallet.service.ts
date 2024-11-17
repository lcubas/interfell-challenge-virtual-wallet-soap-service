import { Injectable } from '@nestjs/common';
import { WalletRepository } from './repositories/wallet.repository';
import { TransactionRepository } from './repositories/transactions.repository';

export interface RechargeWalletDTO {
  amount: number;
  documentNumber: string;
  phoneNumber: string;
}

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async getBalance() {}

  async rechargeWallet(recharge: RechargeWalletDTO): Promise<void> {
    console.log('WalletService::rechargeWallet', recharge);

    if (recharge.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    await this.walletRepository.findOneAndUpdate(
      {
        'customer.documentNumber': {
          $eq: recharge.documentNumber,
        },
        'customer.phoneNumber': {
          $eq: recharge.phoneNumber,
        },
      },
      {
        $inc: {
          balance: recharge.amount,
        },
      },
    );
  }

  async updateBalance() {}

  async getTransactons() {}

  async generatePayment() {}

  async confirmPayment() {}
}
