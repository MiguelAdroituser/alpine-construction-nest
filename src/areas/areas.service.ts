import { BadRequestException, Injectable } from '@nestjs/common';
import { Area } from './models/area.model';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AreasService {
  constructor(@InjectModel(Area.name) private areaModel: Model<Area>){}

  async create(area: Area) {
    try {
      
      // Verifica si el userId es un customerId válido
      if (!Types.ObjectId.isValid(area.customerId)) {
        throw new BadRequestException('Invalid customerId format');
      }
      
      if (!Types.ObjectId.isValid(area.craftId)) {
        throw new BadRequestException('Invalid craftId format');
      }

      const newArea = new this.areaModel(area);
      return await newArea.save();

    } catch (error) {
      throw error;
    }
  } 

  findAll() {
    return this.areaModel.find();
  }

  async findByCustomerId(customerId: Types.ObjectId) {
    return this.areaModel.find({ customerId }).exec();
  }

  async findByFilters(filters: any) {
    return this.areaModel.find(filters).exec();
  }
  

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  async update(id: string, updateAreaDto: Partial<Area>): Promise<Area> {
    const updateArea = await this.areaModel.findByIdAndUpdate(id, updateAreaDto, { new: true });
    return updateArea;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
