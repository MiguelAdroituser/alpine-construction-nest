import { BadRequestException, Injectable } from '@nestjs/common';
import { Area } from './models/area.model';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AreasService {
  constructor(@InjectModel(Area.name) private areaModel: Model<Area>){}

  async create(area: Area) {
    try {
      
      // Verifica si el userId es un ObjectId válido
      if (!Types.ObjectId.isValid(area.customerId)) {
        throw new BadRequestException('Invalid userId format');
      }

      const newArea = new this.areaModel(area);
      return await newArea.save();

    } catch (error) {
      throw error;
    }
  } 

  findAll() {
    return `This action returns all areas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  /* update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  } */

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
