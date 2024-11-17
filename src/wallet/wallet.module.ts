import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { WalletSchema } from './schemas/wallet.schema';
import { TransactionSchema } from './schemas/transaction.schema';
import { WalletRepository } from './repositories/wallet.repository';
import { TransactionRepository } from './repositories/transactions.repository';
import { WalletService } from './wallet.service';

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
    ]),
  ],
  providers: [WalletService, WalletRepository, TransactionRepository],
  exports: [WalletRepository],
})
export class WalletModule {}
