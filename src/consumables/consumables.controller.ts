import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ConsumablesService } from './consumables.service';
import { Consumable } from './models/consumable.model';
import { Types } from 'mongoose';

@Controller('consumables')
export class ConsumablesController {
  constructor(private readonly consumablesService: ConsumablesService) {}

  @Get()
  async getConsumables(
    @Query('customerId') customerId?: string,
    @Query('projectId') projectId?: string
  ) {
    try {
      const filters: any = {}; // Initialize an empty filter object

      if (customerId) {
        filters.customerId = new Types.ObjectId(customerId);
      }

      if (projectId) {
        filters.projectId = new Types.ObjectId(projectId);
      }

      if (Object.keys(filters).length > 0) {
        return await this.consumablesService.findByFilters(filters); // Use the new dynamic filter function
      }
      return this.consumablesService.findAll();

    } catch (error) {
      throw new HttpException('Invalid customerId format', HttpStatus.BAD_REQUEST);
    }
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumablesService.findOne(+id);
  }

  @Post('create')
  @HttpCode(200)
  create(@Body() data: Consumable) {
    try {
      const { customerId, craftId, projectId } = data;

      //Parse string to ObjectId
      data.customerId = new Types.ObjectId(customerId)
      data.craftId = new Types.ObjectId(craftId)
      data.projectId = new Types.ObjectId(projectId); 

      delete data['_id'];

      return this.consumablesService.create(data);

    } catch (error) {
      throw new HttpException({ message: 'Error al guardar' }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumableDto: Partial<Consumable>) {
    return this.consumablesService.update(id, updateConsumableDto);
  }

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumablesService.remove(+id);
  } */
}
