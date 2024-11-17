import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { CustomerSchema } from './customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerSchema.name,
        schema: SchemaFactory.createForClass(CustomerSchema),
      },
    ]),
  ],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
