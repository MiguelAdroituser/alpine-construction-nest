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
  
  async generateBudgetPdf(data: any) {
    // Placeholder logic for generating PDF

    // console.log('budget-pdf service', data.areas)

    // NOTAS:
    // 1.- Realizar sumatoria total por craft (Tile, Paint, etc.)
    // 2.- Realizar la sumatorial final El gran total.

    /* Crafts of the building. */ //Name of the building (Nombre del proyecto)
    // JSON = [{craft: Tile, total: 12938}, {craft: Paint, total: 12938}, ]

    const craftOfBuilding = Object.values(
      data.areas.reduce((acc, item) => {
        if (!acc[item.craft]) {
          acc[item.craft] = { craft: item.craft, total: 0 };
        }
        // acc[item.craft].total += item.amount;
        acc[item.craft].total += item.total;
        return acc;
      }, {} as Record<string, { craft: string; total: number }>)
    );

    const grandTotal = craftOfBuilding.reduce((sum, item:any) => sum + item.total, 0);


    console.log('craftOfBuilding', craftOfBuilding);
    console.log('grandTotal', grandTotal);

    return { message: 'Budget PDF generation not implemented yet', input: data };
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
