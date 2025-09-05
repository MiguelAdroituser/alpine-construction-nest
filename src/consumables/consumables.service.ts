import { BadRequestException, Injectable } from '@nestjs/common';
import { Consumable } from './models/consumable.model';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ConsumablesService {
  constructor(@InjectModel(Consumable.name) private consumableModel: Model<Consumable> ){}

  async create(consumable: Consumable) {
    try {

      // Verifica si el userId es un customerId válido
      if (!Types.ObjectId.isValid(consumable.customerId)) {
        throw new BadRequestException('Invalid customerId format');
      }
            
      if (!Types.ObjectId.isValid(consumable.craftId)) {
        throw new BadRequestException('Invalid craftId format');
      }

      const newConsumable = new this.consumableModel(consumable);
      return await newConsumable.save();

    } catch (error) {
      throw error;
    }
  }

  async findByFilters(filters: any) {
    return this.consumableModel.find(filters).exec();
  }

  findAll() {
    return this.consumableModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} consumable`;
  }

  async update(id: string, updateConsumableDto: Partial<Consumable>): Promise<Consumable> {
    const updateConsumable = await this.consumableModel.findByIdAndUpdate(id, updateConsumableDto, { new: true });
    return updateConsumable;
  }

  remove(id: number) {
    return `This action removes a #${id} consumable`;
  }
}
