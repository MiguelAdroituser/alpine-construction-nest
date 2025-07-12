import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Material } from './models/material.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class MaterialsService {
  constructor(@InjectModel(Material.name) private materialModel: Model<Material>){}
  
  async create(material: Material) {
    try {
          
          // Verifica si el userId es un customerId válido
          if (!Types.ObjectId.isValid(material.customerId)) {
            throw new BadRequestException('Invalid customerId format');
          }
          
          /* if (!Types.ObjectId.isValid(material.craftId)) {
            throw new BadRequestException('Invalid craftId format');
          } */
    
          const newMaterial = new this.materialModel(material);
          return await newMaterial.save();
    
        } catch (error) {
          throw error;
        }
  }

  findAll() {
    return `This action returns all materials`;
  }

  async findByFilters(filters: any) {
  return this.materialModel.find(filters).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} material`;
  }

  async update(id: string, updateMaterialDto: Partial<Material>) {
    const updateMaterial = await this.materialModel.findByIdAndUpdate(id, updateMaterialDto, { new: true });
    return updateMaterial;
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
