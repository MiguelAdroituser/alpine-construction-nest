import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, HttpException, HttpStatus } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { Material } from './models/material.model';
import { Types } from 'mongoose';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post('create')
  @HttpCode(200)
  create(@Body() material: Material) {
    return this.materialsService.create(material);
  }

  @Get()
  async getMaterials(
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
        return await this.materialsService.findByFilters(filters); // Use the new dynamic filter function
      }

      /* if (customerId) {
        const objectId = new Types.ObjectId(customerId);
        return await this.areasService.findByCustomerId(objectId);
      } */
      // return await this.areasService.findAll(); // Return all areas if no customerId is provided
      return await this.materialsService.findAll();
    } catch (error) {
      throw new HttpException('Invalid customerId format', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialsService.update(+id, updateMaterialDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
}
