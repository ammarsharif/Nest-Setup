import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { RequestWithUser } from './schemas/user.schema';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  @UseGuards(FirebaseAuthGuard)
  @ApiOkResponse({
    type: UserDto,
    description: 'The user profile has been successfully retrieved',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({
    description: 'Get User Profile',
    summary: 'Get User Profile',
  })
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
