import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AreasService } from './areas.service';
import { Area } from './models/area.model';
import { Types } from 'mongoose';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
async getAreas(@Query('customerId') customerId?: string) {
  try {
    if (customerId) {
      const objectId = new Types.ObjectId(customerId);
      return await this.areasService.findByCustomerId(objectId);
    }
    return await this.areasService.findAll(); // Return all areas if no customerId is provided
  } catch (error) {
    throw new HttpException('Invalid customerId format', HttpStatus.BAD_REQUEST);
  }
}

  @Get(':customerId')
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
    try {
      const { customerId } = data;
      //Parse string to ObjectId
      data.customerId = new Types.ObjectId(customerId)
      delete data['_id'];

      return this.areasService.create(data);

    } catch (error) {
      throw new HttpException({ message: 'Error al guardar' }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areasService.update(+id, updateAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areasService.remove(+id);
  } */
}
