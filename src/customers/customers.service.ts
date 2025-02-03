import { Injectable } from '@nestjs/common';
import { Customer } from './models/customer.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>){}

  async create(customer: Customer) {
      try {
        const newCustomer = new this.customerModel(customer);
  
        return await newCustomer.save();
      } catch (error) {
        throw error;
      }
    }

  findAll() {
    return this.customerModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async update(id: string, updateCustomerDto: Partial<Customer>): Promise<Customer> {
    const updateCustomer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true });
    return updateCustomer;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
