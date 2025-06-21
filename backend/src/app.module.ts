import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './auth/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://IpdQjAXL:zYI8nPfpZDIqBFly@us-east-1.ufsuw.mongodb.net/my-mongo-db-bECx'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
