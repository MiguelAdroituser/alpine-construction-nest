import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserSchema } from "../models/user.model";
import { isValidObjectId, Model, Types } from "mongoose";
import * as bcrypt from 'bcrypt';
import { BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
@Injectable()
export class UserService{
    constructor(@InjectModel(User.name)private userModel:Model<User>){
    // constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){

    }
    async getUser(user:User):Promise<User>{
        const u = await this.userModel.findOne({ username: user.username}).exec();
        if (!u) {
            throw new NotFoundException('Usuario no encontrado');
          }
      
          const isPasswordValid = await bcrypt.compare(user.password, u.password);
      
          if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
          }
      
          // Elimina la propiedad de contraseña del objeto de respuesta
          u.password=null;
      
          return u;
        
    }
    
    async createUser(user: Partial<User>): Promise<User> {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      
      try {
        const newUser = new this.userModel({
          username: user.username,
          password: hashedPassword,
          isAdmin: user.isAdmin ?? false,
        });
        
        return await newUser.save();
      } catch (error) {
        // You can add additional error handling here if needed
        throw error; // Let the controller handle it
      }
    }

    async getAllUsers(): Promise<Partial<User>[]> {
      // return this.userModel.find().exec();
      // return this.userModel.find({ isAdmin: false }).exec();
      const users = await this.userModel.find({ isAdmin: false }).exec();
    
      // Map through the users and remove the 'password' field
      return users.map(user => {
        const { password, ...userWithoutPassword } = user.toObject(); // Exclude 'password'
        return userWithoutPassword;
      });
    }

    async updateUser(id: string, updatedUserData: Partial<User>) {

       // Update the user
     
        try {
          let filter;
  
          // Check if the provided ID is a valid ObjectId format
          if (Types.ObjectId.isValid(id)) {
              // If valid ObjectId, convert it
              filter = { _id: new Types.ObjectId(id) };
          } else {
              // If not a valid ObjectId, assume it's a string (or any other custom type)
              filter = { _id: id };
          }
  
          // Update the user
          const updatedUser = await this.userModel.findOneAndUpdate(filter, updatedUserData, { new: true });
  
          if (!updatedUser) {
              throw new NotFoundException(`User with id ${id} not found`);
          }
  
          return updatedUser;
      } catch (error) {
          // Log the error for inspection
          console.error(`Error updating user with id ${id}:`, error);
  
          // Optionally, throw a custom error
          throw new InternalServerErrorException('An error occurred while updating the user');
      }
    }
}