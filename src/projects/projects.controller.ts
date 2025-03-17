import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Types } from 'mongoose';
import { Project } from './models/project.model';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(@Query('customerId') customerId?: string) {
    try {
        if (customerId) {
          const objectId = new Types.ObjectId(customerId);
          return await this.projectsService.findByCustomerId(objectId);
        }
        return await this.projectsService.findAll(); // Return all areas if no customerId is provided
      } catch (error) {
        throw new HttpException('Invalid customerId format', HttpStatus.BAD_REQUEST);
      }
  }

  @Post()
  create(@Body() data: Project) {
    try {
      const { customerId } = data;
      //Parse string to ObjectId
      data.customerId = new Types.ObjectId(customerId)

      delete data['_id'];

      return this.projectsService.create(data);

    } catch (error) {
      throw new HttpException({ message: 'Error al guardar' }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: Partial<Project>) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
