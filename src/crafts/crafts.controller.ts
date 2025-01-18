import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { CraftsService } from './crafts.service';
import { Craft } from './models/craft.model';

@Controller('crafts')
export class CraftsController {
  constructor(private readonly craftsService: CraftsService) {}

  @Get()
  getAllCrafts() {
    return this.craftsService.findAll();
  }
  
  @Post('create')
  @HttpCode(200)
  create(@Body() data: Craft) {
    try {
      delete data['_id'];
      return this.craftsService.create(data);
      
    } catch (error) {
      throw  new HttpException({message:'Error al guardar'}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatedCraftData: Partial<Craft>){
    try{
        // const update=await this.mealService.updateMeal(id,updatedCraftData);
        const update=await this.craftsService.update(id,updatedCraftData);
        return update;
    }catch(error){
        throw new HttpException({message:'Error al actualizar'}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  
}
