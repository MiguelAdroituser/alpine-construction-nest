import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './models/customer.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema }
    ])
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
