import { Module } from '@nestjs/common';
// import { MealModule } from './modules/meal/meal.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

// import { SessionModule } from './modules/session/session.module';
import { EnvConfiguration } from './config/app.config';
import { CraftsModule } from './crafts/crafts.module';
import { AreasModule } from './areas/areas.module';
import { CustomersModule } from './customers/customers.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    /* ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // uri: configService.get<string>('mongodb+srv://caf_Fq33ZTc@clter0.qqdjb.mongodb.net'),  // Accede a MONGO_URI usando ConfigService
        uri: configService.get<string>( process.env.MONGODB ),  // Accede a MONGO_URI usando ConfigService
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    } as MongooseModuleOptions), */
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      // validationSchema: JoiValidationSchema,
    }), 
    MongooseModule.forRoot( process.env.MONGODB, {
      dbName: 'clientsbudgets'
    }),
    // MealModule,
    AuthModule,
    CraftsModule,
    AreasModule,
    CustomersModule,
    ProjectsModule,
    // SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
