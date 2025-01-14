import { Module } from '@nestjs/common';
import { CraftsService } from './crafts.service';
import { CraftsController } from './crafts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Craft, CraftSchema } from './models/craft.model';

@Module({
  imports:[
    MongooseModule.forFeature([
        { name: Craft.name, schema: CraftSchema }
    ]),
],
  controllers: [CraftsController],
  providers: [CraftsService],
})
export class CraftsModule {}
