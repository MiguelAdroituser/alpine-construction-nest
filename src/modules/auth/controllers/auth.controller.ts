import { Controller, Get, Post, Body, HttpCode, UnauthorizedException, Patch, Param, HttpException, HttpStatus, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
// import { SessionService } from 'src/modules/session/services/session.service';
@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService, private authService: AuthService,
        // private sessionsService: SessionService,
    ) {

    }
    @Post('login')
    @HttpCode(200)
    async login(@Body() data: User) {
        console.log('endpoint auth backend');

        const user = await this.userService.getUser(data);

        console.log('endpoint auth backend');

        if (user) {
            // Genera el token de acceso (JWT) utilizando el userId
            const accessToken = await this.authService.generateToken({ userId: user._id });

            // Convert ObjectId to a string
            const userIdString = user._id.toString();

            // Crea una sesión de tipo 'http' para la autenticación
            // await this.sessionsService.createSession(user._id, accessToken, 'http');
            // await this.sessionsService.createSession(userIdString, accessToken, 'http');

            console.log({user})

            const { isAdmin, username } = user;
            // Devuelve el accessToken y el userId
            return {
                accessToken,
                isAdmin,
                username
            };
        }

        // Si las credenciales no son válidas, lanza una excepción de autenticación
        throw new UnauthorizedException('Credenciales inválidas');
    }

    @Get('users')
    @HttpCode(200)
    async getUsers() {
        const users = await this.userService.getAllUsers();
        return users;
    }

    //TODO: create user
    @Post('create')
    @HttpCode(201)
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            const createdUser = await this.userService.createUser(createUserDto);
            return { username: createdUser.username };
        } catch (error) {
            // Handle duplicate username error (MongoDB error code 11000)
            if (error.code === 11000) {
            throw new ConflictException('Username already exists');
            }
            
            // Handle validation errors (like missing required fields)
            if (error.name === 'ValidationError') {
            throw new BadRequestException(error.message);
            }
            
            // For all other errors
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    /* @Patch('users/:id')
    async updateUserById( @Param('id') id: string, @Body() updatedUserData: Partial<User> ) {
            
        const booleanKeys = ['folio', 'reverso', 'reversoFolio', 'marco', 'marcoFolioReverso', 'marcoReverso'];
        delete updatedUserData['_id'];
        delete updatedUserData['username'];

        booleanKeys.forEach((key) => {
            if (updatedUserData[key] === 'true') {
                updatedUserData[key] = true;
            } else if (updatedUserData[key] === 'false') {
                updatedUserData[key] = false;
            }
            });

        const result = await this.userService.updateUser(id, updatedUserData);
        return result
        
    } */
}