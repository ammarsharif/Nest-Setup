import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './strategies/firebase.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService, FirebaseStrategy],
})
export class AuthModule {}