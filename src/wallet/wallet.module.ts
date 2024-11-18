import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { WalletSchema } from './schemas/wallet.schema';
import { TransactionSchema } from './schemas/transaction.schema';
import { WalletRepository } from './repositories/wallet.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { WalletService } from './wallet.service';
import { Mailer } from './mailer';
import { PaymentSessionSchema } from './schemas/payment-session.schema';
import { PaymentSessionRepository } from './repositories/payment-session.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WalletSchema.name,
        schema: SchemaFactory.createForClass(WalletSchema),
      },
      {
        name: TransactionSchema.name,
        schema: SchemaFactory.createForClass(TransactionSchema),
      },
      {
        name: PaymentSessionSchema.name,
        schema: SchemaFactory.createForClass(PaymentSessionSchema),
      },
    ]),
  ],
  providers: [
    Mailer,
    WalletService,
    WalletRepository,
    TransactionRepository,
    PaymentSessionRepository,
  ],
  exports: [WalletRepository],
})
export class WalletModule {}
