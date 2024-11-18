import { Injectable } from '@nestjs/common';
import { WalletRepository } from './repositories/wallet.repository';

@Injectable()
export class Mailer {
  constructor(private readonly walletRepository: WalletRepository) {}

  async sendMail() {}
}
