import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Material } from './models/material.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class MaterialsService {
  constructor(@InjectModel(Material.name) private areaModel: Model<Material>){}
  
  async create(material: Material) {
    try {
          
          // Verifica si el userId es un customerId válido
          if (!Types.ObjectId.isValid(material.customerId)) {
            throw new BadRequestException('Invalid customerId format');
          }
          
          /* if (!Types.ObjectId.isValid(material.craftId)) {
            throw new BadRequestException('Invalid craftId format');
          } */
    
          const newArea = new this.areaModel(material);
          return await newArea.save();
    
        } catch (error) {
          throw error;
        }
  }

  findAll() {
    return `This action returns all materials`;
  }

  async findByFilters(filters: any) {
  return this.areaModel.find(filters).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} material`;
  }

  /* update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`;
  } */

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
