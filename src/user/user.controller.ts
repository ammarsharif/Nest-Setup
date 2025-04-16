import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { RequestWithUser } from './schemas/user.schema';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('access-token')
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

  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    type: User,
    description: 'The user profile has been successfully updated',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiOperation({
    description: 'Update User Profile',
    summary: 'Update User Profile',
  })
  @Patch('update/:id')
  updateProfile(@Param('id') id: string, @Body() data: User) {
    if (!id) {
      throw new Error('User ID is required');
    }
    return this.userService.updateUser(id, data);
  }

  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    type: User,
    description: 'The user profile has been deleted successfully',
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
    description: 'Delete User Profile',
    summary: 'Delete User Profile',
  })
  @Delete('delete/:id')
  deleteProfile(@Param('id') id: string) {
    if (!id) {
      throw new Error('User ID is required');
    }
    console.log('deleteProfile', id);
    return this.userService.deleteUser(id);
  }
}
