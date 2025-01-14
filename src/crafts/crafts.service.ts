import { Injectable } from '@nestjs/common';
import { Craft } from './models/craft.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CraftsService {
  constructor(@InjectModel(Craft.name) private craftModel: Model<Craft>){}
  async create(craft: Craft) {
    try {
      const newCraft = new this.craftModel(craft);

      return await newCraft.save();
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.craftModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} craft`;
  }

  async update(id: number, updateCraftDto: Partial<Craft>): Promise<Craft> {
    const updateCraft = await this.craftModel.findByIdAndUpdate(id, updateCraftDto, { new: true });
    return updateCraft;
  }

  remove(id: number) {
    return `This action removes a #${id} craft`;
  }
}
