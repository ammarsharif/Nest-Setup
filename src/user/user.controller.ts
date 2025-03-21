import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { RequestWithUser } from './schemas/user.schema';

@Controller('user')
export class UserController {
  @UseGuards(FirebaseAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
