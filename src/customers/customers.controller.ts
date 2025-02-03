import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './models/customer.model';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getAllCustomers() {
    return this.customersService.findAll();
  }

  @Post('create')
  @HttpCode(200)
  create(@Body() data: Customer) {
    try {
      delete data['_id'];
      return this.customersService.create(data);
    } catch (error) {
      
    }
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedCustomerData: Partial<Customer>) {
    return this.customersService.update(id, updatedCustomerData);
  }
  
  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  } */
  
}
