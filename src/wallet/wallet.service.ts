import { Injectable } from '@nestjs/common';
import { WalletRepository } from './repositories/wallet.repository';
import { TransactionRepository } from './repositories/transactions.repository';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async getBalance() {}

  async updateBalance() {}

  async getTransactons() {}

  async generatePayment() {}

  async confirmPayment() {}
}
