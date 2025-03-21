import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './strategies/firebase.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService, FirebaseStrategy],
})
export class AuthModule {}
