import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';

export interface CreateCustomerDTO {
  name: string;
  email: string;
  documentNumber: string;
  phoneNumber?: string;
}

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(customer: CreateCustomerDTO) {
    return await this.customerRepository.create(customer);
  }
}
