import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { AreasService } from './areas.service';
import { Area } from './models/area.model';
import { Types } from 'mongoose';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  getAllAreas() {
    return this.areasService.findAll();
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
