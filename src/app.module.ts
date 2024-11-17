import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './customer/customer.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    CustomerModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
