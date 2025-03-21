import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      throw new UnauthorizedException('No Firebase token found');
    }
    return await this.authService.verifyToken(idToken);
  }
}
