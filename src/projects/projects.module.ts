import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema, Project } from './models/project.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: CustomerSchema }
    ])
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
