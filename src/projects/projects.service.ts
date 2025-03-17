import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './models/project.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProjectsService {

  constructor(@InjectModel(Project.name) private projectModel: Model<Project>){}

  async create(project: Project) {
    try {
          
          // Verifica si el userId es un customerId válido
          if (!Types.ObjectId.isValid(project.customerId)) {
            throw new BadRequestException('Invalid customerId format');
          }
          
         /*  if (!Types.ObjectId.isValid(project.craftId)) {
            throw new BadRequestException('Invalid craftId format');
          } */
    
          const newProject = new this.projectModel(project);
          return await newProject.save();
    
        } catch (error) {
          throw error;
        }
  }

  async findByCustomerId(customerId: Types.ObjectId) {
      return this.projectModel.find({ customerId }).exec();
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(id: string, updateProjectDto: Partial<Project>): Promise<Project> {
    const updateArea = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
    return updateArea;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
