import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AreasService } from './areas.service';
import { Area } from './models/area.model';
import { Types } from 'mongoose';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) { }

  @Get()
  async getAreas(
    @Query('customerId') customerId?: string,
    @Query('projectId') projectId?: string
  ) {
    //TODO: agregar el projectId, se filtrara por proyecto y customer
    try {
      const filters: any = {}; // Initialize an empty filter object

      if (customerId) {
        filters.customerId = new Types.ObjectId(customerId);
      }
      if (projectId) {
        filters.projectId = new Types.ObjectId(projectId);
      }

      if (Object.keys(filters).length > 0) {
        return await this.areasService.findByFilters(filters); // Use the new dynamic filter function
      }

      /* if (customerId) {
        const objectId = new Types.ObjectId(customerId);
        return await this.areasService.findByCustomerId(objectId);
      } */
      return await this.areasService.findAll(); // Return all areas if no customerId is provided
    } catch (error) {
      throw new HttpException('Invalid customerId format', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':customerId')
  //TODO: agregar el projectId, se filtrara por proyecto y customer
  async getAreasByCustomerId(@Param('customerId') customerId: string) {
    try {
      const objectId = new Types.ObjectId(customerId);
      return await this.areasService.findByCustomerId(objectId);
    } catch (error) {
      throw new HttpException('Invalid customerId format', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  @HttpCode(200)
  create(@Body() data: Area) {
    //TODO: agregar el projectId, se filtrara por proyecto y customer
    try {
      const { customerId, craftId, projectId } = data;
      //Parse string to ObjectId
      data.customerId = new Types.ObjectId(customerId)
      data.craftId = new Types.ObjectId(craftId)
      data.projectId = new Types.ObjectId(projectId); 

      delete data['_id'];

      return this.areasService.create(data);

    } catch (error) {
      throw new HttpException({ message: 'Error al guardar' }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  @Post('budget-pdf')
  @HttpCode(200)
  async generateBudgetPdf(@Body() data: any) {
    try {
      // Placeholder logic
      console.log('budget-pdf controller')
      return await this.areasService.generateBudgetPdf(data); // You’ll implement this in the service
    } catch (error) {
      throw new HttpException(
        { message: 'Error generating budget PDF' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: Partial<Area>) {
    return this.areasService.update(id, updateAreaDto);
  }

  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasService.findOne(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areasService.remove(+id);
  } */
}
