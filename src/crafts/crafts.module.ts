import { Module } from '@nestjs/common';
import { CraftsService } from './crafts.service';
import { CraftsController } from './crafts.controller';

@Module({
  controllers: [CraftsController],
  providers: [CraftsService],
})
export class CraftsModule {}
