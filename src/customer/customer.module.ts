import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { CustomerSchema } from './schemas/customer.schema';
import { CustomerRepository } from './repositories/customer.repository';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerSchema.name,
        schema: SchemaFactory.createForClass(CustomerSchema),
      },
    ]),
    WalletModule,
  ],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
