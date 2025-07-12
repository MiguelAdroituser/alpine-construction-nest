import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Material, MaterialSchema } from './models/material.model';

@Module({
  imports:[
      MongooseModule.forFeature([
        { name: Material.name, schema: MaterialSchema }
      ])
    ],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
